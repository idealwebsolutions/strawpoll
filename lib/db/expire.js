const cron = require('node-cron')
const debug = require('debug')('db:expire-jobs')

const Poll = require('./').Poll

const now = Date.now()

async function fetchExpiring () {
  let expiring = []

  try {
    expiring = await Poll.getExpiring()
  } catch (err) {
    return debug(err)
  }

  return expiring
}
