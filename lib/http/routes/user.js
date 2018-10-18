const { Router } = require('express')

const { 
  LOGOUT_ROUTE,
  BASE_ROUTE,
  DASHBOARD_SUMMARY_ROUTE,
  LOGOUT_SCHEMA
} = require('../../constants')

const {
  parseJson,
  validateSchema,
  validateCsrf, 
  csrfProtection,
  ensureProtectedRoute 
} = require('../middleware/custom')

const UserController = require('../controllers/user')

const user = Router()

// Protected routes
// Logout
// POST /user/logout - Logout user session
user.post(
  LOGOUT_ROUTE,
  ensureProtectedRoute(BASE_ROUTE),
  parseJson,
  validateSchema(LOGOUT_SCHEMA),
  validateCsrf,
  UserController.logout(BASE_ROUTE)
)
// GET /user/dashboard - User dashboard
user.get(
  DASHBOARD_SUMMARY_ROUTE,
  ensureProtectedRoute(BASE_ROUTE),
  csrfProtection,
  UserController.renderDashboard
)
//
module.exports = user
