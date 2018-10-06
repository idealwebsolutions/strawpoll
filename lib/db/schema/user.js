const assert = require('assert')
const { isEmail } = require('validator')
const debug = require('debug')('schema:users')

const Schema = require('./')
const { 
  isString, 
  isArray, 
  sanitize 
} = require('../../util')
const {
  USERS_TABLE_NAME,
  MAX_EMAIL_ADDRESS_BOUNDARY,
  PROVIDERS
} = require('../../constants')

module.exports = class User extends Schema {
  constructor (db) {
    super(db)
  }

  static connect (db) {
    return new User(db)
  }

  async get (input = {}) {
    assert(
      isString(input.email) || (isArray(input.emails) && input.emails.length > 0), 
      'invalid input type: email'
    )

    const sanitizedInput = Object.assign(input, {
      email: sanitize(input.email || input.emails[0].value)
    })

    debug(sanitizedInput)

    const rows = await this._db.select()
      .from(USERS_TABLE_NAME)
      .where({
        email: sanitizedInput.email,
        provider: sanitizedInput.provider
      })
    
    if (!rows.length) {
      throw new Error('get: no rows found')
    }
    
    const user = rows[0]
    
    if (!user) {
      throw new Error('get: user not found')
    }

    return user
  }

  async remove (input = {}) {}

  async create (input = {}) {
    assert(
      isString(input.email) || (isArray(input.emails) && input.emails.length > 0), 
      'invalid input type: email'
    )
    assert(
      isString(input.screen_name) || isString(input.displayName), 
      'invalid input type: screen name'
    )

    const email = sanitize(input.email || input.emails[0].value)

    if (!isEmail(email)) {
      throw new Error('create: invalid email')
    }

    if (email.length > MAX_EMAIL_ADDRESS_BOUNDARY) {
      throw new RangeError('create: email address is too long')
    }
    
    const providers = PROVIDERS.enums.map((provider) => provider.key.toLowerCase())
    let provider

    if (providers.indexOf(input.provider) > -1) {
      provider = providers[providers.indexOf(input.provider)]
      debug('using provider ' + provider)
    }

    const screenName = sanitize(input.screen_name || input.displayName)
    /*let avatar

    if (provider === 'twitchtv') {
      avatar = input.logo
    } else if (input.hasOwnProperty('avatar')) {
      avatar = input.avatar
    } else if (provider === 'twitter' || provider === 'google') {
      avatar = input.photos[0].value
    }*/

    const inserts = await this._db.transaction(async (trx) => {
      const rows = await trx.insert({
        email: email,
        screen_name: screenName,
        provider: provider[0].toUpperCase() + provider.slice(1)
      })
        .into(USERS_TABLE_NAME)
        .returning(['id', 'email', 'screen_name'])
        .transacting(trx)

      return rows
    })

    if (!inserts.length) {
      throw new RangeError('create: no users found with that email')
    }
    
    return inserts[0]
  }
}
