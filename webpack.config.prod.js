require('dotenv').load()

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const RenameOutputPlugin = require('rename-output-webpack-plugin')

const config = require('./webpack.config')

/*const plugins = config.plugins

plugins.unshift(new UglifyJsPlugin({
  uglifyOptions: {
    ecma: 8
  }
}))

plugins.concat(new RenameOutputPlugin({
  app: '[name]-[hash].js'
})*/

module.exports = Object.assign(config, {
  output: {
    filename: '[name]-[id].js',
    publicPath: `${__dirname}/public`
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8
      }
    }),
    new RenameOutputPlugin({
      app: '[name]-[hash].js'
    })
  ]
})
