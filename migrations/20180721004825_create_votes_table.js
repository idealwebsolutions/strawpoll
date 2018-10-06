const { 
  VOTES_TABLE_NAME,
  CHOICES_TABLE_NAME,
  POLLS_TABLE_NAME 
} = require('../lib/constants')

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(VOTES_TABLE_NAME).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(VOTES_TABLE_NAME, (table) => {
        table.increments('id').primary()
        table.integer('poll').unsigned()
        table.foreign('poll').references('id').inTable(POLLS_TABLE_NAME).onDelete('CASCADE')
        table.string('ipv4_address').notNullable()
        table.string('user_agent').nullable()
        table.string('value').notNullable()
        table.foreign('value').references('value').inTable(CHOICES_TABLE_NAME)
      })
    }
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(VOTES_TABLE_NAME)
}
