const {
  POLLS_TABLE_NAME,
  CHOICES_TABLE_NAME,
  MAX_VALID_CHOICE_CHARACTER_LENGTH
} = require('../lib/constants')

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(CHOICES_TABLE_NAME).then((exists) => {
      if (!exists) {
        return knex.schema.createTable(CHOICES_TABLE_NAME, (table) => {
          table.increments('id').notNullable().primary()
          table.integer('poll').notNullable().unsigned()
          table.foreign('poll').references('id').inTable(POLLS_TABLE_NAME).onDelete('CASCADE')
          table.string('value', MAX_VALID_CHOICE_CHARACTER_LENGTH).notNullable().unique()
        })
      }
    })
  }

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(CHOICES_TABLE_NAME)
}
