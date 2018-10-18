const asyncHandler = require('express-async-handler')

const MainTemplate = require('../../../resources/views/pages/main')
const ErrorTemplate = require('../../../resources/views/pages/error')

exports.renderFront = asyncHandler(async (req, res) => {
  await res.marko(MainTemplate, {
    authenticated: req.isAuthenticated(),
    user: req.user,
    token: req.csrfToken(),
    field: req.query.field,
    error: req.query.error
  })
})

exports.busyAPIRequest = (req, res) => {
  res.status(429).json({
    error: 'API limit threshold has been reached'
  })
}

exports.busyRequest = (req, res) => {
  res.status(429).marko(ErrorTemplate, {
    error: 'Unable to fulfill request. Please try again later'
  })
}

exports.errorOccured = (err, req, res, next) => {
  req.log.error(err)
  // Render page differently if page is not actually found
  const is404 = /^404/.test(err.message)
  res.status(!is404 ? 500 : 404).marko(ErrorTemplate, {
    error: !is404
  })
}
