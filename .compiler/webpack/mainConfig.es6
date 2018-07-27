'use strict'
import { MainEntry, OutputPath, RendererPath } from '../constant'
import webpack from 'webpack'
import webpackDefinePlugin from './plugins/webpackDefinePlugin'
import BabelMinifyWebpackPlugin from 'babel-minify-webpack-plugin'
import mainRules from './rules/mainRules'
import { externals } from './externals'
process.env.BABEL_ENV = 'main'
let mainConfig = {
  entry: {
    main: [MainEntry]
  },
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  externals: externals,
  module: {
    rules: mainRules
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: OutputPath
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    webpackDefinePlugin
  ],
  resolve: {
    alias: {
      '@': RendererPath
    },
    extensions: ['.js', '.json', '.node']
  },
  target: 'electron-main'
}

// minify on production
if (process.env.NODE_ENV === 'production') mainConfig.plugins.push(new BabelMinifyWebpackPlugin())

export default mainConfig
