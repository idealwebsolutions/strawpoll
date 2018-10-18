const { Router } = require('express')

const {
  validateSchema,
  validateCsrf,
  csrfProtection,
  limitRequest,
  ensureProtectedRoute,
  forceAuthenticatedRoute,
  parseForm,
  parseJson
} = require('../middleware/custom')

const {
  BASE_ROUTE,
  POLL_ROUTE,
  LIVE_RESULTS_ROUTE,
  DASHBOARD_SUMMARY_ROUTE,
  POLL_SUBMISSION_SCHEMA,
  VOTE_SUBMISSION_SCHEMA
} = require('../../constants')

const MainController = require('../controllers/main')
const PollController = require('../controllers/poll')
const VoteController = require('../controllers/vote')
const UserController = require('../controllers/user')

const limiter = limitRequest(MainController.busyRequest)
const site = Router()
// Unprotected routes
// Base route / Front page (get & post)
// GET / -
site.get(
  BASE_ROUTE,
  limiter,
  forceAuthenticatedRoute(`/user${DASHBOARD_SUMMARY_ROUTE}`),
  csrfProtection,
  MainController.renderFront
)
// POST / - General poll submission
site.post(
  BASE_ROUTE,
  limiter, 
  parseForm,
  validateSchema(POLL_SUBMISSION_SCHEMA),
  validateCsrf,
  PollController.validate, 
  PollController.createAndFinish
)
// GET /:hash - Poll view route
site.get(
  POLL_ROUTE, 
  limiter,
  csrfProtection,
  // PollController.fetch,
  // PollController.protect,
  PollController.render
)
// router.get('/poll/embed/:hash')
// POST /:hash - Poll vote route
site.post(
  POLL_ROUTE,
  limiter,
  parseJson,
  validateCsrf,
  validateSchema(VOTE_SUBMISSION_SCHEMA),
  PollController.verify,
  VoteController.submit
)
// GET /live/:hash - Live poll results
site.get(
  LIVE_RESULTS_ROUTE,
  limiter,
  VoteController.monitor
)
// Protected routes
// GET /dashboard - User dashboard
site.get(
  DASHBOARD_SUMMARY_ROUTE, 
  ensureProtectedRoute(BASE_ROUTE), 
  /*PollController.sample,*/ 
  UserController.renderDashboard
)
site.use(MainController.errorOccured)
//
module.exports = site
