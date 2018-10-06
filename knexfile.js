require('dotenv').load()

module.exports = {
  development: {
    client: 'sqlite3',
    debug: true,
    connection: {
      filename: process.env.SQLITE_DATABASE_FILENAME
    },
    pool: {
      afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done)
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.PG_CONNECTION_HOST,
      port: process.env.PG_CONNECTION_PORT,
      user: process.env.PG_CONNECTION_USER,
      password: process.env.PG_CONNECTION_PASSWORD,
      database: process.env.PG_CONNECTION_DATABASE,
      ssl: false // true
    },
    useNullAsDefault: true
  }
}
