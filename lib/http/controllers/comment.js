const assert = require('assert')
const asyncHandler = require('express-async-handler')
const debug = require('debug')('controller:comment')

const { 
  Comment,
  Poll
} = require('../../db')

// JSON API: Creates new comment
exports.create = asyncHandler(async (req, res) => {
  
})

// JSON API: Updates a single comment
exports.update = asyncHandler(async (req, res) => {
})

// JSON API: Deletes a single comment
exports.delete = asyncHandler(async (req, res) => {
})

// JSON API: Deletes entire comment collection
exports.deleteAll = asyncHandler(async (req, res, next) => {
})

// JSON API: Fetches comment collection
exports.fetch = asyncHandler(async (req, res, next) => {
  const hash = req.params.hash
  let id

  try {
    id = await Poll.decode(hash)
  } catch (err) {
    req.log.error(err)
    return next(err)
  }

  let comments

  try {
    comments = await Comment.getAll(id)
  } catch (err) {
    req.log.error(err)
    comments = []
  }

  res.status(200).json(comments)
})
