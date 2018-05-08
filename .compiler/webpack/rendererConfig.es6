'use strict'
import path from 'path'
import { RendererEntry, StaticPath, RendererPath, MainPath, OutputPath } from '../constant'
import { dependencies } from '../../package.json'
import webpack from 'webpack'
import BabelMinifyWebpackPlugin from 'babel-minify-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import EslintFriendlyFormatter from 'eslint-friendly-formatter'
import whiteListedModules from '../whiteListedModules'
import cssLoader from './loaders/cssLoader'
import sassLoader from './loaders/sassLoader'
import lessLoader from './loaders/lessLoader'
import fontLoader from './loaders/fontLoader'
import imageLoader from './loaders/imageLoader'
import mediaLoader from './loaders/mediaLoader'
import { VueLoaderPlugin } from 'vue-loader'

process.env.BABEL_ENV = 'renderer'

let rendererConfig = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    renderer: RendererEntry
  },
  externals: [
    ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
  ],
  module: {
    rules: []
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../../src/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules: process.env.NODE_ENV !== 'production'
        ? path.resolve(__dirname, '../../node_modules')
        : false
    }),
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
    alias: {
      // vue-material start
      'components': path.join(RendererPath, 'vue-material', 'src', 'components'),
      'vue-material/material': path.join(RendererPath, 'vue-material', 'src', 'material.js'),
      'core': path.join(RendererPath, 'vue-material', 'src', 'core'),
      'theme': path.join(RendererPath, 'vue-material', 'src', 'theme'),
      // vue-material end
      '@pages': path.join(RendererPath, 'components', 'pages'),
      '@partials': path.join(RendererPath, 'components', 'partials'),
      '@extras': path.join(RendererPath, 'components', 'extras'),
      '@helpers': path.join(RendererPath, 'helpers'),
      '@mixins': path.join(RendererPath, 'mixins'),
      '@windowDefinitions': path.join(MainPath, 'windowDefinitions'),
      '@windowUrls': path.join(MainPath, 'windowUrls'),
      '@': RendererPath,
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node', '.scss', 'less']
  },
  target: 'electron-renderer'
}

const baseRules = [
  {
    test: /\.worker\.js$/,
    exclude: /node_modules/,
    use: { loader: 'worker-loader' }
  },
  {
    test: /\.(js|vue)$/,
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
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  cssLoader,
  sassLoader,
  lessLoader,
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
  },
  mediaLoader,
  imageLoader,
  fontLoader,
  {
    test: /\.(md|txt)(\?.*)?$/,
    use: {
      loader: 'raw-loader'
    }
  }
]

rendererConfig.module.rules = [].concat(baseRules)

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${StaticPath.replace(/\\/g, '\\\\')}"`
    })
  )
}

if (process.env.NODE_ENV !== 'production') {
  rendererConfig.mode = 'development'
} else {
  rendererConfig.mode = 'production'
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  rendererConfig.devtool = ''

  rendererConfig.plugins.push(
    new BabelMinifyWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: StaticPath,
        to: path.join(OutputPath, 'static'),
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

export default rendererConfig
