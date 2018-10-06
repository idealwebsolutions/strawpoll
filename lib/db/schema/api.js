const debug = require('debug')('schema:api');

const {
  API_KEYS_TABLE_NAME
} = require('../../constants');

const { generateRandomUUID } = require('../../util');

const Schema = require('./');

module.exports = class API extends Schema {
  constructor (db) {
    super(db);
  }

  static connect (db) {
    return new API(db);
  }

  async generateNewKey (priority = false) {
    const result = await this._db.transaction(async (trx) => {
      const rows = await trx.insert({
        priority: priority,
        value: generateRandomUUID()
      })
        .into(API_KEYS_TABLE_NAME)
        .returning('value')
        .transacting(trx)

        return rows
    })

    if (typeof result[0] !== 'string') {
      const rows = await this._db.select('value').from(API_KEYS_TABLE_NAME)
        .where('id', result[0])
      
      if (!rows.length) {
        throw new Error('generateNewKey: No rows found')
      }

      return rows[0].value
    }

    return result
  }

  async isValidKey (key) {
    const rows = await this._db.count('id')
      .where('value', key)

    if (!rows.length) {
      throw new Error('isValidKey: No such key exists')
    }

    return rows[0].count > 0
  }
};
