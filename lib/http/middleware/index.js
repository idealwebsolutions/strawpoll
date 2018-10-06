const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const session = require('express-session')
// const { urlencoded, json } = require('body-parser')
const cookieParser = require('cookie-parser')
const marko = require('marko/express')
const logger = require('express-pino-logger')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('express-no-favicons')())
  app.use(require('response-time')())
}

app.use(marko())
app.use(compression())
app.use(cookieParser())
app.use(session({
  secure: process.env.NODE_ENV === 'production',
  secret: process.env.SECRET,
  maxAge: process.env.NODE_ENV === 'development' ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000, // 5 minutes
  resave: true,
  saveUninitialized: true
}))
app.use(logger())
app.use(helmet.noCache())

module.exports = app
