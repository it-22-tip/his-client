'use strict'
import path from 'path'
import { MainEntry, StaticPath, OutputPath, RendererPath } from '../constant'
import { dependencies } from '../../package.json'
import webpack from 'webpack'
import BabelMinifyWebpackPlugin from 'babel-minify-webpack-plugin'
import EslintFriendlyFormatter from 'eslint-friendly-formatter'
process.env.BABEL_ENV = 'main'
let mainConfig = {
  entry: {
    main: MainEntry
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: EslintFriendlyFormatter
          }
        }
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
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      '@': RendererPath,
    },
    extensions: ['.js', '.json', '.node']
  },
  target: 'electron-main'
}

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${StaticPath.replace(/\\/g, '\\\\')}"`
    })
  )
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  mainConfig.plugins.push(
    new BabelMinifyWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  )
}

if (process.env.NODE_ENV !== 'production') {
  mainConfig.mode = 'development'
} else {
  mainConfig.mode = 'production'
}

export default mainConfig
