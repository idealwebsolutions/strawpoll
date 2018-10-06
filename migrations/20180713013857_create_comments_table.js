const { 
  POLLS_TABLE_NAME,
  USERS_TABLE_NAME,
  COMMENTS_TABLE_NAME,
  MAX_COMMENT_CHARACTER_LENGTH,
  COMMENT_TYPE
} = require('../lib/constants')

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(COMMENTS_TABLE_NAME).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(COMMENTS_TABLE_NAME, (table) => {
        table.increments('id').primary()
        table.integer('poll').notNullable().unsigned()
        table.foreign('poll').references('id').inTable(POLLS_TABLE_NAME).onDelete('CASCADE')
        table.integer('author').notNullable().unsigned()
        table.foreign('author').references('id').inTable(USERS_TABLE_NAME)
        table.enu('type', COMMENT_TYPE.enums.map((type) => type.key)).defaultTo(COMMENT_TYPE.Post.key).notNullable()
        table.string('content', MAX_COMMENT_CHARACTER_LENGTH).notNullable()
        table.integer('upvotes').unsigned().defaultTo(0)
      })
    }
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(COMMENTS_TABLE_NAME)
}
