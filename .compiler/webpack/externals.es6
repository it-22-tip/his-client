import { dependencies } from '../constant'
import webpackNodeExternals from 'webpack-node-externals'

const whiteListedModules = [
  'vue',
  'vue-markdown'
]

const externals = [
  ...Object.keys(dependencies || {})
]

const whiteListed = [
  ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
]

export { externals, whiteListed, webpackNodeExternals }
