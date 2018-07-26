'use strict'
import path from 'path'
import { assign } from 'lodash'
import { RendererEntry, StaticPath, OutputPath } from '../constant'
import webpack from 'webpack'
import { VueMaterialAlias, BaseAlias } from './alias'
import BabelMinifyWebpackPlugin from 'babel-minify-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import htmlWebpackPlugin from './plugins/htmlWebpackPlugin'
import webpackDefinePlugin from './plugins/webpackDefinePlugin'
import rendererRules from './rules/rendererRules'
import { whiteListed } from './externals'
import { VueLoaderPlugin } from 'vue-loader'

process.env.BABEL_ENV = 'renderer'

let rendererConfig = {
  devtool: process.env.NODE_ENV !== 'production' ? '#cheap-module-eval-source-map' : '',
  entry: {
    renderer: RendererEntry
  },
  externals: whiteListed,
  mode: 'development', // process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  module: {
    rules: rendererRules
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'minify.css'
    }),
    htmlWebpackPlugin,
    webpackDefinePlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: OutputPath,
    // worker loader workaround
    globalObject: 'this'
  },
  resolve: {
    alias: assign({}, BaseAlias),
    extensions: ['.js', '.es6', '.vue', '.json', '.node', '.css', '.scss', '.sass', 'less']
  },
  target: 'electron-renderer',
  serve: {
    port: 9080
  }
}

if (process.env.NODE_ENV === 'production') {
  rendererConfig.plugins.push(
    new BabelMinifyWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: StaticPath,
        to: path.join(OutputPath, 'static'),
        ignore: ['.*']
      }
    ]),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  )
}

export default rendererConfig
