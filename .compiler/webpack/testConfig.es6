'use strict'
import path from 'path'
import webpack from 'webpack'
import whiteListedModules from './whiteListedModules'
import { VueLoaderPlugin } from 'vue-loader'
import nodeExternals from 'webpack-node-externals'
process.env.BABEL_ENV = 'renderer'
let testConfig = {
  devtool: 'inline-cheap-module-source-map',
  externals: [
    nodeExternals()
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'null-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'null-loader'
      },
      {
        test: /\.less$/,
        loader: 'null-loader'
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
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
