import webpack from 'webpack'
import WebpackServe from 'webpack-serve'
import { rendererConfig } from '../webpack/config'
async function rendererServer () {
  let server
  const compiler = webpack(rendererConfig)
  const options = {
    compiler: compiler,
    port: 9080,
    logLevel: 'silent',
    hotClient: {
      validTargets: ['electron-renderer'],
      logLevel: 'silent'
    },
    devMiddleware: {
      logLevel: 'silent'
    }
  }
  server = await WebpackServe({}, options)
  return server
}

export default rendererServer
