require('dotenv').load()

const { NoEmitOnErrorsPlugin } = require('webpack')
const RenameOutputPlugin = require('rename-output-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: `${__dirname}/resources/assets/scripts/index.js`
  },
  externals: {
    google: 'google'
  },
  output: {
    filename: '[name]-[id].js',
    path: `${__dirname}/public`
  },
  resolve: {
    extensions: ['.js', '.marko']
  },
  module: {
    rules: [
      {
        test: /\.marko/,
        use: 'marko-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'webpack-unassert-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ],
          publicPath: `${__dirname}/public`
        })
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
    new RenameOutputPlugin({
      app: '[name]-[hash].js'
    })
  ]
}
