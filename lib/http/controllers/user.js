const asyncHandler = require('express-async-handler')
const debug = require('debug')('controller:user')

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

exports.renderDashboard = asyncHandler(async (req, res) => {
  await res.marko(DASHBOARD_TEMPLATE, {
    title: 'Dashboard - Summary',
    authenticated: req.isAuthenticated(),
    user: req.user
  })
})

exports.createSessionToken = asyncHandler(async (req, res, next) => {
})

exports.verifySessionToken = asyncHandler(async (req, res, next) => {
})

exports.finishLogin = (redirectTo) => asyncHandler(async (req, res) => {
  req.log.debug('Login triggered')
  await res.status(302).redirect(redirectTo)
})

exports.logout = (redirectTo) => asyncHandler(async (req, res) => {
  req.log.debug('Logout triggered')
  
  if (req.user) {
    req.log.debug('Destroying session')
    return req.logout()
  }
  
  await res.status(301).redirect(redirectTo)
})

exports.follow = asyncHandler(async (req, res) => {
  throw new Error('Method not implemented')
})
