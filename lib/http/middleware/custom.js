const { Recaptcha } = require('express-recaptcha')
const { urlencoded, json } = require('body-parser')
const csrf = require('csurf')
const isValidJson = require('is-my-json-valid')
const RateLimit = require('express-rate-limit')

const { RECAPTCHA_SITE_KEY } = require('../../constants')

exports.recaptcha = new Recaptcha(
  RECAPTCHA_SITE_KEY,
  process.env.RECAPTCHA_SECRET_KEY
)

exports.limitRequest = (handler, max = 50) => new RateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: max,
  handler
})

exports.csrfProtection = csrf({
  cookie: true
})

exports.validateCsrf = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err)
  }

  res.status(403).json({
    reason: 'Invalid token'
  })
}

exports.parseForm = urlencoded({
  extended: false
})

exports.parseJson = json({ 
  strict: true 
})

exports.validateSchema = (schema) => (req, res, next) => {
  const validator = isValidJson(schema)
  
  if (!validator(req.body)) {
    // TODO: error page
    return res.status(400).json({
      errors: validator.errors
    })
  }
    
  next()
}

exports.ensureProtectedRoute = (redirectBackTo) => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  
  res.redirect(redirectBackTo)
}

exports.forceAuthenticatedRoute = (redirectTo) => (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect(redirectTo) 
  }

  next()
}
