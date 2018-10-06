const {
  POLLS_TABLE_NAME,
  VIEWS_TABLE_NAME
} = require('../lib/constants')

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(VIEWS_TABLE_NAME).then((exists) => {
      if (!exists) {
        return knex.schema.createTable(VIEWS_TABLE_NAME, (table) => {
          table.increments('id').notNullable().primary()
          table.integer('poll').notNullable().unsigned()
          table.foreign('poll').references('id').inTable(POLLS_TABLE_NAME).onDelete('CASCADE')
          table.string('ipv4_address').notNullable() // .unique() ip-address
        })
      }
    })
  }

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(VIEWS_TABLE_NAME)
}
