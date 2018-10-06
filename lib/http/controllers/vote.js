const asyncHandler = require('express-async-handler')
const debug = require('debug')('controller:vote')

const { 
  Poll, 
  Vote
} = require('../../db')

const { stringifyJSON } = require('../../util')

exports.monitor = asyncHandler(async (req, res) => {
  const hash = req.params.hash
  
  let id

  try {
    id = await Poll.decode(hash)
  } catch (err) {
    req.log.error(err)
    return res.status(500).json({
      reason: 'Not a valid poll identifier'
    })
  }

  let votes

  try {
    votes = await Vote.getAll(id) 
  } catch (err) {
    req.log.error(err)
  }
  
  req.socket.setNoDelay(true)
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  })
  res.connection.setTimeout(0)

  res.app.on(`vote:${hash}`, async (choice) => {
    res.write('event: uservote\n')
    try {
      const vote = await stringifyJSON({ name: choice })
      res.write(`data: ${vote}\n\n`)
    } catch (err) {
      req.log.error(err)
      res.write(`error: ${err.message}\n\n`)
    }
  })
  
  res.write(':ok\n\n')
  
  if (votes) {
    res.write('event: pollresults\n')
    try {
      const results = await stringifyJSON(votes)
      res.write(`data: ${results}\n\n`)
    } catch (err) {
      req.log.error(err)
      res.write(`error: ${err.message}\n\n`)
    }
  }
}) 

exports.submit = asyncHandler(async (req, res) => {
  const hash = req.params.hash
  const choice = req.body.choice
  const remoteAddress = req.headers['x-forwarded-for'] || req.ip
  const userAgent = req.headers['user-agent'] || ''

  debug(`New vote from remote address: ${remoteAddress}`)

  try {
    // Decode poll hash
    const id = await Poll.decode(hash)
    // Get poll permissions
    const permission = await Poll.getPermissions(id)
    // Add new submission entry
    await Vote.insert(id, choice, permission, remoteAddress, userAgent)
  } catch (err) {
    req.log.error(err)
    return res.status(500).json({
      success: false
    })
  }
  
  res.app.emit(`vote:${hash}`, choice)
  
  await res.json({
    success: true
  })
})
