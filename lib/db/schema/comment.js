const assert = require('assert')
const debug = require('debug')('schema:comments')

const Schema = require('./')

const { 
  USERS_TABLE_NAME,
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

  async insert (content, poll = -1, author = -1, upvotes = -1) {
    assert(isString(content), 'content is not a valid string')
    assert(isNumber(poll), 'poll id is not a valid number')
    assert(isNumber(author), 'author id is not a valid number')

    const comment = await this._db.transaction(async (trx) => {
      const submission = {
        poll,
        author,
        content
      }
      
      if (upvotes > 0) {
        submission.upvotes = upvotes
      }

      const rows = await trx.insert(submission)
        .into(COMMENTS_TABLE_NAME)
        .returning(['id'])
        .transacting(trx)

      return rows
    })
    
    return comment
  }

  async getAll (pid = -1, max = 10) {
    assert(isNumber(pid), 'poll id is not a valid number')

    const comments = await this._db.select(
      ['created', 'content', 'upvotes', 'screen_name', 'avatar', 'role']
    ) // c.id
      //.as('c')
      .from(COMMENTS_TABLE_NAME)
      .innerJoin(USERS_TABLE_NAME, 'users.id', 'comments.author')
      //.as('u')
      .where('poll', pid)
      .limit(max)
    
    if (!comments.length) {
      throw new RangeError('getAll: No comments found')
    }

    return comments
  }
}

module.exports = Comment
