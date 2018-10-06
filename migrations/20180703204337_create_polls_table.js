const { 
  POLLS_TABLE_NAME,
  MAX_QUESTION_BOUNDARY,
  STATUS,
  PERMISSIONS
} = require('../lib/constants')

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(POLLS_TABLE_NAME).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(POLLS_TABLE_NAME, (table) => {
        table.increments('id').notNullable().primary()
        table.integer('owned').nullable() // allow anonymous
        table.string('owner_key').nullable() // anonymous only key to admin poll
        table.enu('status', STATUS.enums.map((status) => status.key)).notNullable().defaultTo(STATUS.Active.key)
        table.timestamp('created').notNullable().defaultTo(knex.fn.now())
        table.timestamp('expiry').nullable()
        table.boolean('public').notNullable().defaultTo(true)
        table.boolean('multiple').notNullable().defaultTo(false)
        table.boolean('protect').notNullable().defaultTo(false)
        table.enu('permission', PERMISSIONS.enums.map((permission) => permission.key)).notNullable()
        table.string('question', MAX_QUESTION_BOUNDARY).notNullable()
        table.integer('likes').unsigned().notNullable().defaultTo(0)
      })
    }
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(POLLS_TABLE_NAME)
}
