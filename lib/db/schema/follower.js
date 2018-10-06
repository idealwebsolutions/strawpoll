const Schema = require('./');

module.exports = class Follower extends Schema {
  constructor () {
    super();
  }

  static connect (db) {
    return new Follower(db);
  }

  async add () {
    this._db.transaction(async (trx) => {
    })
  }
};
