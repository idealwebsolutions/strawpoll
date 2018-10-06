const express = require('express')

const {
  api,
  login,
  web
} = require('./routes')

const app = express()
//
app.use('/api', api)
app.use('/login', login)
app.use('/', web)
// router.get('/dashboard/drafts', MainController.viewDashboard)
module.exports = app
