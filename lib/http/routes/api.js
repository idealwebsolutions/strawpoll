const { Router } = require('express')

const {
  parseJson,
  limitRequest,
  validateSchema
} = require('../middleware/custom')

const {
  POLL_API_FETCH_ENDPOINT,
  POLL_API_PATCH_ENDPOINT,
  POLL_API_DELETE_ENDPOINT,
  POLL_API_CREATE_ENDPOINT,
  POLL_CREATION_SCHEMA
} = require('../../constants')

const PollController = require('../controllers/poll')

const limiter = limitRequest()
const api = Router()
// JSON API: Poll Resource
api.get(
  '/api/v1/poll/trending',
  limiter,
  PollController.trending
)

api.get(
  '/api/v1/poll/newest', 
  limiter,
  PollController.newest
)
// GET /api/v1/poll/:hash
api.get(
  POLL_API_FETCH_ENDPOINT, 
  limiter, 
  PollController.fetch
)
// PATCH /api/v1/poll/:hash
api.patch(
  POLL_API_PATCH_ENDPOINT,
  limiter,
  parseJson,
  PollController.patch
)
// DELETE /api/v1/poll/:hash
api.delete(
  POLL_API_DELETE_ENDPOINT,
  limiter,
  PollController.delete
)
// POST /api/v1/poll
api.post(
  POLL_API_CREATE_ENDPOINT,
  limiter,
  parseJson,
  validateSchema(POLL_CREATION_SCHEMA),
  PollController.create
)
// GET /api/v1/comments/:hash
api.get(
  '/api/v1/comments/:hash',
  limiter//,
//  CommentController.fetch
)
//
api.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      reason: 'Internal server error'
    })
  }

  res.status(404).json({
    reason: 'No such route exists'
  })
})

module.exports = api
