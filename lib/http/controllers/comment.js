const assert = require('assert')
const asyncHandler = require('express-async-handler')
const debug = require('debug')('controller:comment')

const { Comment } = require('../../db')

exports.create = asyncHandler(async (req, res) => {
  
})

exports.update = asyncHandler(async (req, res) => {
})

exports.delete = asyncHandler(async (req, res) => {
})

exports.fetch = asyncHandler(async (req, res) => {
  const hash = req.params.hash
})
