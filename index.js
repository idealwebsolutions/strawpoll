require('marko/node-require').install()
require('dotenv').load()

const { join } = require('path')
// const { readFileSync } = require('fs')
const { createServer } = require('spdy')
const express = require('express')

const router = require('./lib/http/router')
const middleware = require('./lib/http/middleware')
const auth = require('./lib/http/middleware/auth')

// require('marko/hot-reload').enable()
// require('marko/browser-refresh').enable()

const app = express()

app.use(middleware)
app.use(auth)

if (process.env.NODE_ENV === 'development') {
  app.use('/static', express.static('public'))
} else {
  app.enable('trust proxy')
}

app.use(router)

const server = createServer(require('spdy-keys'), app)
  .listen(process.env.PORT || 9000, '0.0.0.0', 
    () => {
      /*if (process.send) {
        process.send('online')
      }*/

      console.log(`Listening on port ${server.address().port}`)
    }
)
