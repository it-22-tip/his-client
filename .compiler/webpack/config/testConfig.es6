'use strict'
import { OutputPath } from '../../constant'
import webpack from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
import { webpackNodeExternals } from '../externals'
import testRules from '../rules/testRules'
process.env.BABEL_ENV = 'renderer'
let testConfig = {
  devtool: 'inline-cheap-module-source-map',
  externals: [
    webpackNodeExternals()
  ],
  mode: 'development',
  module: {
    rules: testRules
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: OutputPath
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'regeneratorRuntime$': 'regenerator-runtime'
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node', '.scss', 'less']
  },
  target: 'node'
}

export default testConfig
