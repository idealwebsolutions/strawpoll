const { 
  USERS_TABLE_NAME,
  MAX_EMAIL_ADDRESS_BOUNDARY,
  PROVIDERS,
  ROLES
} = require('../lib/constants')

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(USERS_TABLE_NAME).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(USERS_TABLE_NAME, (table) => {
        table.increments('id').primary().notNullable()
        table.enu('provider', PROVIDERS.enums.map((provider) => provider.key)).notNullable()
        table.string('email', MAX_EMAIL_ADDRESS_BOUNDARY).nullable()
        table.string('screen_name').nullable()
        table.string('avatar').nullable()
        table.enu('role', ROLES.enums.map((role) => role.key)).notNullable().defaultTo(ROLES.Guest.key)
        table.integer('followers').notNullable().defaultTo(0).unsigned()
      })
    }
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(USERS_TABLE_NAME)
}
