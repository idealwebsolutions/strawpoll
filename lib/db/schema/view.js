const assert = require('assert')
const debug = require('debug')('schema:views')

const Schema = require('./')

const { VIEWS_TABLE_NAME } = require('../../constants')

module.exports = class View extends Schema {
  constructor (db) {
    super(db)
  }

  static connect (db) {
    return new View(db)
  }

  async increment (id, remoteAddress) {
    const inserts = await this._db.transaction(async (trx) => {
      const rows = await trx.insert({
        poll: id,
        ipv4_address: remoteAddress
      })
      .into(VIEWS_TABLE_NAME)
      .returning(['id'])
      .transacting(trx)

      return rows
    })
  }

  async count (id, unique=false) {
    const rows = await this._db.count('id')
      .from(VIEWS_TABLE_NAME)
      .where('poll', '=', id)
    
    if (!rows.length) {
      throw new RangeError('count: No rows returned')
    }

    const poll = rows[0]
    
    return poll['count(`id`)'] || poll['count']
  }
}
