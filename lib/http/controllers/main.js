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

exports.busyRequest = (req, res) => {
  res.status(500).marko(ErrorTemplate, {
    error: 'Unable to fulfill request. Please try again later'
  })
}

exports.errorOccured = (err, req, res, next) => {
  req.log.error(err)
  const is404 = /^404/.test(err.message)
  res.status(!is404 ? 500 : 404).marko(ErrorTemplate, {
    error: !is404
  })
}
