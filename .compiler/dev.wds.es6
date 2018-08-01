'use strict'

import chalk from 'chalk'
import electron from 'electron'
import path from 'path'
import { spawn } from 'child_process'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import { mainConfig, rendererConfig } from './webpack/config'
import { greeting, logStats, electronLog } from './consoleLogger'
import { CompilerPath, MainPath, OutputPath } from './constant'

let electronProcess = null
let manualRestart = false
let webpackHotMiddleware

const startRenderer = function () {
  return new Promise((resolve, reject) => {
    rendererConfig.entry.renderer = [path.join(CompilerPath, 'dev-client.es6')].concat(rendererConfig.entry.renderer)

    const compiler = webpack(rendererConfig)
    webpackHotMiddleware = WebpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })

    compiler.hooks.compilation.tap(
      'compilation',
      compilation => {
        compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(
          'htmlWebpackPluginAfterEmit',
          (data, cb) => {
            webpackHotMiddleware.publish({ action: 'reload' })
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
          app.use(webpackHotMiddleware)
          ctx.middleware.waitUntilValid(() => {
            resolve()
          })
        }
      }
    )

    server.listen(9080)
  })
}

const startMain = function () {
  return new Promise((resolve, reject) => {
    mainConfig.entry.main = [path.join(MainPath, 'index.dev.js')].concat(mainConfig.entry.main)

    const compiler = webpack(mainConfig)

    compiler.hooks.watchRun.tapAsync(
      'watch-run-plugins-pusing',
      (compilation, done) => {
        logStats('Main', chalk.white.bold('compiling...'))
        webpackHotMiddleware.publish({ action: 'compiling' })
        done()
      }
    )

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      logStats('Main', stats)

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}

const startElectron = function () {
  let env = Object.create(process.env)
  env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
  env.IS_DEVELOPMENT = true
  electronProcess = spawn(electron, ['--inspect=5858', path.join(OutputPath, 'main.js')], { env: env })

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'green')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'yellow')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

const init = async function () {
  try {
    greeting()
    await startRenderer()
    await startMain()
    startElectron()
  } catch (error) {
    console.error(error)
  }
}

init()
