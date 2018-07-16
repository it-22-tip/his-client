import webpack from 'webpack'
import webpackHotMiddleware from 'webpack-hot-middleware'
import WebpackDevServer from 'webpack-dev-server'
import { rendererConfig } from './webpack'
import path from 'path'

let hotMiddleware

const startRenderer = function () {
  return new Promise((resolve, reject) => {
    rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client.es6')].concat(rendererConfig.entry.renderer)

    const compiler = webpack(rendererConfig)
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })

    compiler.hooks.compilation.tap(
      'compilation',
      compilation => {
        compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(
          'htmlWebpackPluginAfterEmit',
          (data, cb) => {
            hotMiddleware.publish({ action: 'reload' })
            cb()
          }
        )
      }
    )
    compiler.hooks.done.tap(
      'done',
      stats => {
        logStats('Renderer', stats)
      }
    )

    const server = new WebpackDevServer(
      compiler,
      {
        contentBase: path.join(__dirname, '../'),
        quiet: true,
        before (app, ctx) {
          app.use(hotMiddleware)
          ctx.middleware.waitUntilValid(() => {
            resolve()
          })
        }
      }
    )

    server.listen(9080)
  })
}

export default startRenderer
