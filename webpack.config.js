require('dotenv').load()

const { join } = require('path')
const { NoEmitOnErrorsPlugin } = require('webpack')
// const RenameOutputPlugin = require('rename-output-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    site: `${__dirname}/resources/assets/scripts/site.js`,
    main: `${__dirname}/resources/assets/scripts/main.js`,
    login: `${__dirname}/resources/assets/scripts/login.js`,
    vote: `${__dirname}/resources/assets/scripts/vote.js`,
    dashboard: `${__dirname}/resources/assets/scripts/dashboard.js`,
    polyfills: `${__dirname}/resources/assets/scripts/polyfills.js`
  },
  externals: {
    google: 'google'
  },
  output: {
    path: join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.marko']
  },
  module: {
    rules: [
      {
        test: /\.marko$/,
        loader: "marko-loader"
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        js: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }/*,
        css: {
          test: /\.(sa|sc|c)ss$/,
          name: 'commons',
          chunks: 'all'
        }*/
      }
    }
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin(), // [name]-[hash].css
  ]
}
