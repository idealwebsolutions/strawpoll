const assert = require('assert')
const series = require('fastseries')({ results: false })
const { escape } = require('validator')
const debug = require('debug')('schema:choices')

const Schema = require('./')

const {
  isNumber,
  isString,
  isArray,
  isValidSequence, 
  sanitizeMany,
  asyncify
} = require('../../util')

const {
  CHOICES_TABLE_NAME,
  VALID_CHOICE_SEQUENCE,
  MIN_VALID_CHOICES_BOUNDARY,
  MAX_VALID_CHOICES_BOUNDARY
} = require('../../constants')

module.exports = class Choice extends Schema {
  constructor (db) {
    super(db)
  }

  static connect (db) {
    return new Choice(db)
  }

  static async validate (choices) {
    assert(isArray(choices), 'invalid input type: choices is not array')
    
    const result = await asyncify((input) => {
      const filtered = sanitizeMany(input)

      if (!isValidSequence(VALID_CHOICE_SEQUENCE, filtered)) {
        throw new SyntaxError('validate: invalid field syntax')
      }
    
      if (filtered.length < MIN_VALID_CHOICES_BOUNDARY) {
        throw new RangeError('validate: minimum boundary not met')
      }

      if (filtered.length > MAX_VALID_CHOICES_BOUNDARY) {
        throw new RangeError('validate: maximum boundary reached')
      }
    })(choices)

    return result
  }

  async batchCreate (id = -1, choices) {
    assert(isNumber(id), 'invalid input type: field id - expected number')
    assert(isArray(choices), 'invalid input type: field choices - expected array')
    assert(
      choices.every(a => (typeof a === 'string')), 
      'invalid input type: answer - expected string'
    )

    await this._db.transaction((trx) => {
      series({}, sanitizeMany(choices).map((choice) => {
        return (arg, done) => {
          trx.insert({
            poll: id,
            value: choice
          })
          .into(CHOICES_TABLE_NAME)
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

  async getAll (id = -1) {
    assert(isNumber(id), 'invalid input type: expected number')
    assert(id > 0, 'invalid input type: non zero value expected')

    const rows = await this._db.select('value')
      .from(CHOICES_TABLE_NAME)
      .where('poll', id)
   
    if (!rows.length) {
      throw new RangeError('getAll: no rows found')
    }

    return rows.map((row) => row.value)
  }

  /*async count (id = -1) {
    assert(isNumber(id), 'invalid input type: expected number')
    assert(id > 0, 'invalid input type: non zero value expected')

    const rows = await this._db.count('id')
      .from(CHOICES_TABLE_NAME)
      .where({ poll: id })

    if (!rows.length) {
      throw new RangeError('count: no rows found')
    }

    return rows
  }*/
}
