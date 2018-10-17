const assert = require('assert')
const asyncHandler = require('express-async-handler')
const debug = require('debug')('controller:comment')

const { 
  Comment,
  Poll
} = require('../../db')

exports.create = asyncHandler(async (req, res) => {
  
})

exports.update = asyncHandler(async (req, res) => {
})

exports.delete = asyncHandler(async (req, res) => {
})

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
    return res.status(200).json({
      error: 'No comments found'
    })
  }

  res.status(200).json(comments)
})
