const Schema = require('./')

class Comment extends Schema {
  constructor (db) {
    super(db)
  }

  static connect (db) {
    return new Comment(db)
  }

  async insert () {
  
  }
}

module.exports = Comment
