const assert = require('assert')
const series = require('fastseries')({ results: false })
const debug = require('debug')('schema:tags')

const Schema = require('./')

const { TAGS_TABLE_NAME } = require('../../constants')
const {
  isNumber,
  isString,
  sanitizeMany
} = require('../../util')

module.exports = class Tag extends Schema {
  constructor (db) {
    super(db)
  }

  static connect (db) {
    return new Tag(db)
  }

  async batchAdd (pollId = -1, rawTags) {
    assert(isNumber(pollId), 'pollId is not a valid type - expected number')
    assert(isString(rawTags), 'rawTags is not a valid type - expected string')
    
    const tags = rawTags.split(',')

    if (!tags.length) {
      throw new RangeError('add: No tags found')
    }

    await this._db.transaction((trx) => {
      series({}, sanitizeMany(tags).map((tag) => {
        return (arg, done) => {
          trx.insert({
            poll: pollId,
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

  async getAll (pollId = -1) {
    const rows = await this._db.select('value')
      .from(TAGS_TABLE_NAME)
      .where('poll', pollId)

    if (!rows.length) {
      throw new RangeError('getAll: No tags found')
    }

    return rows.map((row) => row.value)
  }
}
