const debug = require('debug')('controller:user')

const { BASE_ROUTE } = require('../../constants')

const { User } = require('../../db')

const DASHBOARD_TEMPLATE = require('../../../resources/views/pages/dashboard')

exports.findOrCreate = async (token, secret, profile, done) => {
  let user
  
  try {
    user = await User.get(profile)
  } catch (err) {
    //
    if (!user) {
      debug('Creating new user')
      try {
        user = await User.create(profile)
      } catch (err) {
        return done(err)
      }
    }
  }
  
  await done(null, user)
}

exports.renderDashboard = (req, res) => {
  res.marko(DASHBOARD_TEMPLATE, {
    title: `Dashboard - Summary for ${req.user.screen_name}`,
    authenticated: req.isAuthenticated(),
    token: req.csrfToken(),
    user: req.user
  })
}

/*exports.createSessionToken = asyncHandler(async (req, res, next) => {
})

exports.verifySessionToken = asyncHandler(async (req, res, next) => {
})*/
exports.saveLastPage = (req, res, next) => {
  const redirect = req.query.redirect

  // TODO: verify redirect is same origin
  req.session.redirect = redirect

  next()
}

exports.finishLogin = (req, res) => {
  const redirectTo = req.session.redirect
  delete req.session.redirect
  req.log.debug('Login triggered')
  res.status(302).redirect(redirectTo)
}

// JSON API: Logout
exports.logout = (redirectTo) => (req, res, next) => {
  req.log.debug('Logout triggered')
  
  if (!req.user) {
    // This shouldn't happen
    return next(new Error('Session does not exist'))
  }
  
  req.log.debug('Destroying session')
  req.logout()
  res.status(200).json({
    redirect: BASE_ROUTE
  })
}

exports.follow = (req, res) => {
  throw new Error('Method not implemented')
}
