require('dotenv').load()

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = require('./webpack.config')

const plugins = config.plugins

plugins.unshift(new UglifyJsPlugin({
  uglifyOptions: {
    ecma: 8
  }
}))

module.exports = Object.assign(config, {
  plugins
})
