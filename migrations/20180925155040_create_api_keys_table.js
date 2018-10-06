const { 
  API_KEYS_TABLE_NAME, 
  USERS_TABLE_NAME 
} = require('../lib/constants');

exports.up = (knex, Promise) => {
  return knex.schema.hasTable(API_KEYS_TABLE_NAME).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(API_KEYS_TABLE_NAME, (table) => {
        table.increments('id').primary();
        table.boolean('priority').notNullable().defaultTo(false);
        table.uuid('value').notNullable().unique();
        table.timestamp('created').notNullable().defaultTo(knex.fn.now());
        table.integer('owner').nullable().unsigned().unique();
        table.foreign('owner').references('id').inTable(USERS_TABLE_NAME).onDelete('CASCADE');
      });
    }
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(API_KEYS_TABLE_NAME);
};
