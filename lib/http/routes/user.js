const { Router } = require('express')

const { 
  LOGOUT_ROUTE,
  BASE_ROUTE,
  DASHBOARD_SUMMARY_ROUTE
} = require('../../constants')

const { ensureProtectedRoute } = require('../middleware/custom')

const UserController = require('../controllers/user')

const user = Router()

// Protected routes
// Logout
// POST /user/logout - Logout user session
user.post(
  LOGOUT_ROUTE,
  ensureProtectedRoute(BASE_ROUTE),
  UserController.logout(BASE_ROUTE)
)
// GET /user/dashboard - User dashboard
user.get(
  DASHBOARD_SUMMARY_ROUTE,
  ensureProtectedRoute(BASE_ROUTE),
  UserController.renderDashboard
)
//
module.exports = user
