const Redis = require('ioredis')

module.exports = (config = {}) => new Redis(config)
