const assert = require('assert')
const Hashids = require('hashids')
const { applyReducer } = require('fast-json-patch')
const { hackerHot } = require('decay')
const spacetime = require('spacetime')
const debug = require('debug')('schema:polls')

const Schema = require('./')

const {
  isString,
  isNumber,
  isArray,
  isValidSequence, 
  sanitize,
  asyncify
} = require('../../util')

const { 
  APP_NAME,
  PERMISSIONS,
  POLLS_TABLE_NAME,
  DEFAULT_POLL_READ_FIELDS,
  MIN_QUESTION_BOUNDARY,
  MAX_QUESTION_BOUNDARY,
  VALID_QUESTION_SEQUENCE
} = require('../../constants')

module.exports = class Poll extends Schema {
  constructor (db) {
    super(db)
    
    this._hash = new Hashids(APP_NAME)
  }

  static connect (db) {
    return new Poll(db)
  }

  static async validate (question) {
    assert(isString(question), 'invalid input type: question is not string')

    const result = await asyncify((input) => {
      const filtered = sanitize(input)

      if (!isValidSequence(VALID_QUESTION_SEQUENCE, filtered)) {
        throw new SyntaxError('validate: invalid field syntax')
      }
    
      if (filtered.length < MIN_QUESTION_BOUNDARY) {
        throw new RangeError('validate: minimum boundary not met')
      }
    
      if (filtered.length > MAX_QUESTION_BOUNDARY) {
        throw new RangeError('validate: maximum boundary reached')
      }
    })(question)

    return result
  }

  async create (input = {}) {
    debug(input)
    assert(isString(input.question), 'invalid input type: field question - expected string')
    
    const question = sanitize(input.question)
    
    if (!question || question.length === 0) {
      throw new Error('create: question is empty')
    }

    const inserts = await this._db.transaction(async (trx) => {
      const poll = {
        owned: input.user && input.user.id ? input.user.id : null,
        public: (input.private === 'on') ? false : true,
        multiple: (input.multiple === 'on') || false,
        protect: (input.protect === 'on') || false,
        permission: input.permissions[0].toUpperCase() + input.permissions.slice(1),
        question: question
      }

      if (input.created) {
        poll.created = input.created
      }

      if (input.user && input.user.id > 0) {
        poll.expiry = input.expiry
      }

      if (input.likes) {
        poll.likes = input.likes
      }

      const rows = await trx.insert(poll)
        .into(POLLS_TABLE_NAME)
        .returning('id')
        .transacting(trx)

      return rows
    })

    const id = (inserts && isArray(inserts) && !isNaN(inserts[0])) ? inserts[0] : -1
    
    if (id < 0) {
      throw new Error('create: invalid return value: id')
    }

    const hashid = this._hash.encode(id)
      
    if (hashid.length === 0) {
      throw new RangeError('create: invalid hash id created: zero length')
    }

    return {
      id: id,
      hash: hashid
    }
  }
  
  // Default action is to retrieve necessary poll fields
  async get (id = -1, fields=DEFAULT_POLL_READ_FIELDS) {
    assert(isNumber(id), 'invalid input type: expected number')

    const row = await this._db.first(fields)
      .from(POLLS_TABLE_NAME)
      .where({
        id: id
      })
     
    if (!row) {
      throw new Error('get: poll does not exist')
    }

    return row
  }

  async getPermission (id = -1) {
    assert(isNumber(id), 'invalid input type for id: expected number')
    
    const row = await this.get(id, ['permission'])
    
    if (!row.permission) {
      throw new Error('getPermissions: Permission for row not found')
    }

    return PERMISSIONS.get(row.permission)
  }

  async getExpiring () {
    const rows = await this._db.select('id', 'expiry')
      .from(POLLS_TABLE_NAME)
      .whereNotNull('expiry')
    
    if (!rows.length) {
      throw new Error('getExpiring: No expiring polls found')
    }

    return rows
  }

  async getLastDay (max = 10) {
    const results = await this._db.select(['id', 'question', 'likes', 'created'])
      .from(POLLS_TABLE_NAME)
      .where('created', '<', 
        spacetime.now().subtract(1, 'day').format('yyyy.MM.dd h:mm a')
      )
      .limit(max)

    if (!results.length) {
      throw new Error('getTrending: No results found')
    }

    return results
  }

  async getNewestEntries (max = 3) {
    const results = await this._db.select(['id', 'question', 'likes', 'created'])
      .from(POLLS_TABLE_NAME)
      .orderBy('created', 'desc')
      .limit(max)

    if (!results.length) {
      throw new Error('getNewest: No results found')
    }

    return results
  }

  async getTrending (polls, max = 5) {
    return polls.map((poll) => {
      return Object.assign({}, poll, {
        score: hackerHotScore(poll.likes, new Date(poll.created))
      })
    }).sort((a, b) => b.score > a.score)
  }

  async destroy (id = -1) {
    assert(isNumber(id), 'invalid input type for id: expected number')
    
    const affected = await this._db.transaction(async (trx) => {
      const rows = trx.from(POLLS_TABLE_NAME)
        .where('id', id)
        .del()
        .transacting(trx)
      
      return rows
    })

    if (affected === 0) {
      throw new Error('destroy: No such poll exists')
    }
  }

  async sample (uid, where={}, offset=0, limit=10) {
    assert(isNumber(uid), 'invalid input type: expected number')

    const rows = await this._db.select(
      'id', 'status', 'created', 'expiry', 'question', 'public'
    )
      .from(POLLS_TABLE_NAME).where({
        owned: uid
      })
      .where(filter)
      .limit(limit)
      .offset(offset)
    
    if (!rows.length) {
      throw new RangeError('sample: no rows found')
    }

    return rows
  }

  async decode (hash) {
    assert(isString(hash), 'input is not a string')
    
    const result = await asyncify((input) => {
      const decoded = this._hash.decode(input)
    
      if (!decoded.length) {
        throw new Error('decode: hashid does not exist')
      }

      return decoded[0]
    })(hash)

    return result
  }
}
