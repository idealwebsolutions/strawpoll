const {
  POLLS_TABLE_NAME,
  TAGS_TABLE_NAME
} = require('../lib/constants')

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(TAGS_TABLE_NAME).then((exists) => {
      if (!exists) {
        return knex.schema.createTable(TAGS_TABLE_NAME, (table) => {
          table.increments('id').notNullable().primary()
          table.integer('poll').notNullable().unsigned()
          table.foreign('poll').references('id').inTable(POLLS_TABLE_NAME).onDelete('CASCADE')
          table.string('value').notNullable()
        })
      }
    })
  }

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(TAGS_TABLE_NAME)
}
