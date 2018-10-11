const assert = require('assert')
const axios = require('axios')
const asyncHandler = require('express-async-handler')
// const series = require('fastseries')({ results: true })
const { validate } = require('fast-json-patch')
const debug = require('debug')('controller:poll')

const { recaptcha } = require('../middleware/custom')

// const cache = require('../../db/cache')

const {
  Poll,
  View,
  Choice,
  Tag
} = require('../../db')

const { 
  pick, 
  simplifyError
} = require('../../util')

const validatePoll = require('../../db/schema/poll').validate
const validateChoices = require('../../db/schema/choice').validate

const VoteTemplate = require('../../../resources/views/pages/vote')

/*exports.sampleFrom = (req, res) => {
  const uid = req.session.user || -1
  const offset = req.params.offset

  Poll.sample({
    uid: uid,
    offset: offset
  }, (err, samples) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }

    debug(`polls is array: ${Array.isArray(samples)}`)

    // Limit?
    series({}, samples.map((poll) => {
      return (arg, done) => {
        Choice.getAll(poll.id, (err, choices) => {
          if (err) {
            return done(err)
          }
          
          done(null, Object.assign(poll, {
            choices: choices
          }))
        })
      }
    }), null, (err, polls) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error'
        })
      }
      
      res.json({
        polls: polls
      })
    })
  })
}

exports.sample = (req, res, next) => {
  const uid = req.session.user || -1

  Poll.sample({
    uid: uid
  }, (err, polls) => {
    if (err) {
      req.log.error(err)
      // TODO: error page
      return res.status(500).json({
        message: 'Internal server error'
      })
    }

    Choices.count(poll.id, (err, count) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error'
        })
      }
      
      req.polls = polls

      next()
    })
  })
}*/

// JSON API: Fetch poll contents
exports.fetch = asyncHandler(async (req, res, next) => {
  const hash = req.params.hash 
  let id
  
  try {
    id = await Poll.decode(hash)
  } catch (err) {
    req.log.error(err)
    return res.status(500).json({
      message: 'Not a valid poll identifier'
    })
  }

  let poll
  
  try {
    poll = await Poll.get(id)
  } catch (err) {
    req.log.error(err)
    return res.status(404).json({
      message: 'Poll does not exist'
    })
  }

  let choices

  try {
    choices = await Choice.getAll(id)
  } catch (err) {
    req.log.error(err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }

  let tags

  try {
    tags = await Tag.getAll(id)
  } catch (err) {
    req.log.error(err)
  }

  let views

  try {
    views = await View.count(id)
  } catch (err) {
    req.log.error(err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
  
  await res.status(200).json(Object.assign(poll, {
    hash,
    choices,
    tags,
    views
  }))
})

exports.patch = asyncHandler(async (req, res) => {
  const hash = req.params.hash
  const patches = req.body

  let id
  
  try {
    id = await Poll.decode(hash)
  } catch (err) {
    return res.status(400).json({
    })
  }

  let poll

  try {
    poll = await Poll.get(id, 
      ['status', 'permission', 'question', 'multiple', 'public', 'protect']
    )
  } catch (err) {
    return res.status(500).json({
    })
  }

  const validation = jsonpatch.validate(patches, poll)

  if (validation.length > 0) {
    return res.status(400).json(validation.errors)
  }

  try {
    await Poll.update(patches)
  } catch (err) {
  }

  // const updated = patches.reduce(applyReducer, poll)
  
  await res.status(204).end()
})

// JSON API: Poll creation
exports.create = asyncHandler(async (req, res) => {
  const submission = Object.assign(req.body, {
    user: req.session.user || null
  })
  
  debug(submission)

  let poll
  
  try {
    poll = await Poll.create(submission)
    await Choice.batchCreate(poll.id, submission.choices) 
    await Tag.batchAdd(poll.id, submission.tags)
  } catch (err) {
    // TODO: error page
    req.log.error(err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
  
  await res.status(200).json({
    hash: poll.hash
  })
})

// JSON API: Poll Destruction
exports.delete = asyncHandler(async (req, res) => {
  const hash = req.params.hash
  let id

  try {
    id = await Poll.decode(hash)
  } catch (err) {
    req.log.error(err)
    return res.status(400).json({
      reason: 'Invalid identifier'
    })
  }

  try {
    await Poll.destroy(id)
  } catch (err) {
    req.log.error(err)
    return res.status(404).json({
      reason: 'Resource not found'
    })
  }

  await res.status(204).end()
})

//
exports.createAndFinish = asyncHandler(async (req, res) => {
  const submission = req.body
  
  await res.status(302).redirect(`/${hash}`);
})

// Render main template
exports.render = asyncHandler(async (req, res, next) => {
  const hash = req.params.hash
  const remoteAddress = req.headers['x-forwarded-for'] || req.ip
  let id
  
  debug(req.user)  

  try {
    id = await Poll.decode(hash)
  } catch (err) {
    req.log.error(err)
    // Expected error
    // Page not found (hash does not match a valid id)
    return next(new Error('404'))
  }

  try {
    await View.increment(id, remoteAddress)
  } catch (err) {
    req.log.error(err)
    // Expected error
    // Page not found (constraint will not pass if id doesnt exist)
    return next(new Error('404'))
  }
  
  await res.marko(VoteTemplate, {
    authenticated: req.isAuthenticated(),
    user: req.user,
    token: req.csrfToken(),
    hash: hash
  })
})

// Middleware: Protect poll if necessary
exports.protect = asyncHandler(async (req, res, next) => {
  req.session.requiresCaptcha = req.captcha = req.poll.protect

  await next()
})

// Middleware: Verifies captcha 
exports.verify = asyncHandler(async (req, res, next) => {
  if (!req.session.requiresCaptcha) {
    return next()
  }
  // TODO: promisify
  recaptcha.verify(req, async (err, data) => {
    if (err) {
      return res.status(401).json({
        message: err.message
      })
    }

    await next()
  })
})

// Middleware: Validates poll fields
exports.validate = asyncHandler(async (req, res, next) => {
  try {
    await validatePoll(req.body.question)
  } catch (err) {
    req.log.error(err)
    return res.status(400).redirect(`/?field=question&error=${simplifyError(err)}`)
  }

  try {
    await validateChoices(req.body.choices)
  } catch (err) {
    req.log.error(err)
    return res.status(400).redirect(`?field=choices&error=${simplifyError(err)}`)
  }
  
  await next()
})