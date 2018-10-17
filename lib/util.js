const test = require('ramda/src/test')
const pipe = require('ramda/src/pipe')
const map = require('ramda/src/map')
const filter = require('ramda/src/filter')
const replace = require('ramda/src/replace')
const trim = require('ramda/src/trim')
const pick = require('ramda/src/pick')
const is = require('ramda/src/is')
const merge = require('ramda/src/merge')
const escape = require('validator/lib/escape')
const uuidv4 = require('uuid/v4')
const spacetime = require('spacetime')

const DEFAULT_VALID_SEQUENCE = /^(\S+ ?)+$/g
const EMPTY_SEQUENCE = /^\s+$/g

/* Common utility functions */
const cut = (str) => pipe(trim)(str, escape)
const sanitize = (str) => pipe(replace(EMPTY_SEQUENCE, ''), cut)(str)
const asyncify = (fn) => (...args) => new Promise((resolve, reject) => {
  try {
    resolve(fn(...args))
  } catch (err) {
    reject(err)
  }
})

exports.pick = pick
exports.merge = merge
exports.isNumber = (val) => is(Number)(val)
exports.isString = (val) => is(String)(val)
exports.isArray = (obj) => Array.isArray(obj)
exports.sanitize = sanitize
exports.asyncify = asyncify
exports.parseJSON = (json) => asyncify((payload) => JSON.parse(payload))(json)
exports.stringifyJSON = (json) => asyncify((payload) => JSON.stringify(payload))(json)
exports.sanitizeMany = (arr) => pipe(map(sanitize), filter(e => e.length > 0))(arr)
exports.isValidSequence = (seq, str) => test(seq)(str)
exports.convertToLocaltime = (date) => {
  const utc = new Date(new Date(date).toUTCString())
  return new Date(utc.getTime() - utc.getTimezoneOffset() * 60 * 1000)
}
exports.calculateSince = (since) => {
  return spacetime(Date.parse(since)).fromNow().qualified
}
exports.generateRandomUUID = uuidv4

exports.simplifyError = (err) => {
  if (/^.+syntax$/.test(err.message)) {
    return 'syntax'
  }

  if (/^Min.+$/.test(err.message)) {
    return 'min'
  }

  if (/^Max.+max$/.test(err.message)) {
    return 'max'
  }

  return 'unknown'
}
