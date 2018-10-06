const {
  USERS_TABLE_NAME,
  FOLLOWERS_TABLE_NAME
} = require('../lib/constants');

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(FOLLOWERS_TABLE_NAME).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(FOLLOWERS_TABLE_NAME, (table) => {
        table.increments('id').primary();
        table.integer('follower').unsigned().notNullable();
        table.foreign('follower').references('id').inTable(USERS_TABLE_NAME).onDelete('CASCADE');
        table.integer('following').unsigned().notNullable();
        table.foreign('following').references('id').inTable(USERS_TABLE_NAME).onDelete('CASCADE');
      });
    }
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(FOLLOWERS_TABLE_NAME);
};
