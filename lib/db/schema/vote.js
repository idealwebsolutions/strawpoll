const assert = require('assert')
const { v4 } = require('is-ip')
const { getParser } = require('bowser')
const debug = require('debug')('schema:votes')

const Schema = require('./')

const { 
  isNumber, 
  isString 
} = require('../../util')
const { 
  PERMISSIONS, 
  VOTES_TABLE_NAME 
} = require('../../constants')

module.exports = class Vote extends Schema {
  constructor (db) {
    super(db)
  }

  static connect (db) {
    return new Vote(db)
  }

  async _hasVoted (pollId, remoteAddress) {
    assert(isNumber(pollId))
    assert(isString(remoteAddress))

    const rows = await this._db.count('ipv4_address')
      .from(VOTES_TABLE_NAME)
      .where('ipv4_address', remoteAddress)
    
    const result = rows[0]['count(`ipv4_address`)'] || rows[0]['count']
    debug(result)
    return result > 0
  }

  async getAll (pollId) {
    assert(isNumber(pollId))
    
    // Add distinct for polls with moderate permissions?
    const rows = await this._db.select('value')
      .count('value')
      .from(VOTES_TABLE_NAME)
      .groupBy('value')
      .where('poll', pollId)
    
    debug(rows)
    
    if (!rows.length) {
      throw new Error('getAll: No rows found')
    }

    return rows.map((row) => ({
      'name': row.value, 
      'votes': row['count(`value`)'] || row['count'] 
    }))
  }

  async insert (pollId, choice, permission, remoteAddress, userAgent) {
    debug({ pollId, choice, permission, remoteAddress, userAgent })
    assert(isNumber(pollId), 'invalid type error: id is not a number')
    assert(isString(choice), 'invalid type error: choice is not a string')
    
    if (!v4(remoteAddress)) {
      throw new Error('insert: remoteAddress is not a valid ipv4 address')
    }

    if (permission.key === PERMISSIONS.Moderate.key) {
      const hasVoted = await this._hasVoted(pollId, remoteAddress)
      if (hasVoted) {
        throw new Error('insert: Moderate permissions - vote already counted')
      }
    }/* else if (permission.key === PERMISSIONS.High.key) {
      
    }*/

    const inserts = await this._db.transaction(async (trx) => {
      const rows = await trx.insert({
        poll: pollId,
        ipv4_address: remoteAddress,
        value: choice
      })
      .into(VOTES_TABLE_NAME)
      .returning(['id', 'value'])
      .transacting(trx)
      
      return rows
    })

    if (!inserts.length) {
      throw new RangeError('insert: no votes were added')
    }

    return inserts[0]
  }
}
