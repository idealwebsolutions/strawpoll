const assert = require('assert')
const debug = require('debug')('schema:comments')

const Schema = require('./')

const { 
  COMMENT_TYPE, 
  COMMENTS_TABLE_NAME 
} = require('../../constants')

const { 
  isNumber, 
  isString 
} = require('../../util')

class Comment extends Schema {
  constructor (db) {
    super(db)
  }

  static connect (db) {
    return new Comment(db)
  }

  async insert (content, poll = -1, author = -1, isThread = false) {
    assert(isString(content), 'content is not a valid string')
    assert(isNumber(poll), 'poll id is not a valid number')
    assert(isNumber(author), 'author id is not a valid number')

    const comment = await this._db.transaction(async (trx) => {
      const rows = await trx.insert({
        poll: poll,
        author: author,
        content: content,
        type: isThread ? COMMENT_TYPE.Thread.key : COMMENT_TYPE.Post.key
      })
        .into(COMMENTS_TABLE_NAME)
        .returning(['id'])
        .transacting(trx)

      return rows
    })
    
    return comment
  }
}

module.exports = Comment
