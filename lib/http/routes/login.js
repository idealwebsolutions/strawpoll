const { Router } = require('express')
const passport = require('passport')

const {
  TWITTER_LOGIN,
  GOOGLE_LOGIN,
  TWITCHTV_LOGIN,
  TWITTER_AUTHENTICATE,
  GOOGLE_AUTHENTICATE,
  TWITCHTV_AUTHENTICATE,
  BASE_ROUTE,
  LOGOUT_ROUTE,
  DASHBOARD_SUMMARY_ROUTE
} = require('../../constants')

const { 
  ensureProtectedRoute,
  limitRequest 
} = require('../middleware/custom')

const MainController = require('../controllers/main')
const UserController = require('../controllers/user')

const limiter = limitRequest(MainController.busyRequest)
const login = Router()

// Authentication for twitter routes
login.get(
  TWITTER_LOGIN,
  limiter, 
  passport.authenticate('twitter')
)
login.get(
  TWITTER_AUTHENTICATE,
  limiter, 
  passport.authenticate('twitter', {
    failureRedirect: BASE_ROUTE // should be '/login'
  }), 
  UserController.finishLogin(DASHBOARD_SUMMARY_ROUTE)
)
// Authentication for google routes
login.get(
  GOOGLE_LOGIN, 
  limiter, 
  passport.authenticate('google') 
  // {scope: ['profile', 'email'] }
)
login.get(
  GOOGLE_AUTHENTICATE,
  limiter, 
  passport.authenticate('google', { 
    failureRedirect: BASE_ROUTE
  }), 
  UserController.finishLogin(DASHBOARD_SUMMARY_ROUTE)
)
// Authentication for reddit routes
/*login.get(
  REDDIT_LOGIN, 
  limiter, 
  passport.authenticate('reddit')
)
login.get(
  REDDIT_AUTHENTICATE,
  limiter,
  passport.authenticate('reddit', {
    failureRedirect: BASE_ROUTE
  }),
  UserController.finishLogin(DASHBOARD_SUMMARY_ROUTE)
)*/
// Authentication for twitch routes
login.get(
  TWITCHTV_LOGIN,
  limiter,
  passport.authenticate('twitchtv')
)
login.get(
  TWITCHTV_AUTHENTICATE,
  limiter,
  passport.authenticate('twitchtv', {
    failureRedirect: BASE_ROUTE
  }),
  UserController.finishLogin(DASHBOARD_SUMMARY_ROUTE)
)
// Logout (SHOULD BE POST)
login.post(
  LOGOUT_ROUTE, 
  ensureProtectedRoute(BASE_ROUTE), 
  UserController.logout(BASE_ROUTE)
)
//
login.use(MainController.errorOccured)
//
module.exports = login
