'use strict'

import chalk from 'chalk'
import electron from 'electron'
import path from 'path'
import { spawn } from 'child_process'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { mainConfig, rendererConfig } from './webpack'
import { greeting, logStats, electronLog } from './consoleLogger'

let electronProcess = null
let manualRestart = false
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

const startMain = function () {
  return new Promise((resolve, reject) => {
    mainConfig.entry.main = [path.join(__dirname, '../src/main/index.dev.js')].concat(mainConfig.entry.main)

    const compiler = webpack(mainConfig)

    if (compiler.hooks) {
      compiler.hooks.watchRun.tapAsync(
        'watch-run-plugins-pusing',
        (compilation, done) => {
          logStats('Main', chalk.white.bold('compiling...'))
          hotMiddleware.publish({ action: 'compiling' })
          done()
        }
      )
    } else {
      compiler.plugin('watch-run', (compilation, done) => {
        logStats('Main', chalk.white.bold('compiling...'))
        hotMiddleware.publish({ action: 'compiling' })
        done()
      })
    }

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
  electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')], { env: env })

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