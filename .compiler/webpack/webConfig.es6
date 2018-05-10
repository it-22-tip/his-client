'use strict'
import path from 'path'
import webpack from 'webpack'
import BabelMinifyWebpackPlugin from 'babel-minify-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import htmlWebpackPlugin from './plugins/htmlWebpackPlugin'
import { VueLoaderPlugin } from 'vue-loader'
import webRules from './rules/webRules'
import alias from './alias'
import { StaticPath } from '../constant'
process.env.BABEL_ENV = 'web'
let webConfig = {
  devtool: process.env.NODE_ENV !== 'production' ? '#cheap-module-eval-source-map' : '',
  entry: {
    web: path.join(__dirname, '../src/renderer/main.js')
  },
  module: {
    rules: webRules
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    htmlWebpackPlugin,
    new webpack.DefinePlugin({
      'process.env.IS_WEB': 'true'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist/web')
  },
  resolve: {
    alias: alias,
    extensions: ['.js', '.vue', '.json', '.css', '.scss', 'less']
  },
  target: 'web'
}

if (process.env.NODE_ENV !== 'production') {
  webConfig.mode = 'development'
} else {
  webConfig.mode = 'production'
}

/**
 * Adjust webConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  webConfig.plugins.push(
    new BabelMinifyWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: StaticPath,
        to: path.join(__dirname, '../dist/web/static'),
        ignore: ['.*']
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  )
}

export default webConfig
