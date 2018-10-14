const express = require('express')

const {
  api,
  login,
  user,
  web
} = require('./routes')

const app = express()
//
app.use('/api', api)
app.use('/login', login)
app.use('/user', user)
app.use('/', web)
//
module.exports = app
