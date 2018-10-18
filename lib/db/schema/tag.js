const assert = require('assert')
const series = require('fastseries')({ results: false })
const debug = require('debug')('schema:tags')

const Schema = require('./')

const { TAGS_TABLE_NAME } = require('../../constants')
const {
  isNumber,
  isString,
  isArray,
  sanitizeMany
} = require('../../util')

module.exports = class Tag extends Schema {
  constructor (db) {
    super(db)
  }

  static connect (db) {
    return new Tag(db)
  }

  async batchAdd (pid = -1, rawTags) {
    assert(isNumber(pid), 'pid is not a valid type - expected number')
    assert(isString(rawTags), 'rawTags is not a valid type - expected string')
    
    const tags = rawTags.split(',')

    if (!tags.length) {
      throw new RangeError('add: No tags found')
    }

    await this._db.transaction((trx) => {
      series({}, sanitizeMany(tags).map((tag) => {
        return (arg, done) => {
          trx.insert({
            poll: pid,
            value: tag
          })
          .into(TAGS_TABLE_NAME)
          .transacting(trx)
          .asCallback(done)
        }
      }), null, (err) => {
        if (err) {
          trx.rollback(err)  
        } else {
          trx.commit()
        }
      })
    })
  }

  async getAll (pid = -1) {
    assert(isNumber(pid), 'pid is not a valid type: expected number')

    const rows = await this._db.select('value')
      .from(TAGS_TABLE_NAME)
      .where('poll', pid)

    if (!rows.length) {
      throw new RangeError('getAll: No tags found')
    }

    return rows.map((row) => row.value)
  }

  async findSimilar (tags = []) {
    assert(isArray(tags), 'tags is not a valid type: expected array')
    
    const similar = await Promise.all(tags.map(async (tag) => {
      const pid = await this._db.select('poll')
        .from(TAGS_TABLE_NAME)
        .where('value', 'like', tag)

      return pid
    }))

    if (!similar.length) {
      throw new Error('findSimilar: No similar polls found')
    }

    return similar
  }
}
