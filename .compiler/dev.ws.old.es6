'use strict'

import electron from 'electron'
import path from 'path'
import { spawn } from 'child_process'
import webpack from 'webpack'
import WebpackServe from 'webpack-serve'
import { mainConfig, rendererConfig } from './webpack/config'
import { greeting, electronLog, logStats } from './consoleLogger'
import { MainPath, OutputPath } from './constant'
import Promise from 'bluebird'

let electronProcess = null
let manualRestart = false

async function startRenderer () {
  let server
  const compiler = webpack(rendererConfig)
  const options = {
    compiler: compiler,
    port: 9080,
    logLevel: 'debug',
    hotClient: {
      validTargets: ['electron-renderer']
    },
    on: {
      'build-finished': async () => {
        console.log('BUILD-FINISHED')
        await startMain()
        startElectron()
      }
    }
  }
  server = await WebpackServe({}, options)
  return server
}

function startMain () {
  return new Promise((resolve) => {
    mainConfig.entry.main = [path.join(MainPath, 'index.dev.js')].concat(mainConfig.entry.main)
    const compiler = webpack(mainConfig)
    compiler.hooks.watchRun.tapAsync(
      'watch-run-plugins',
      (compilation, done) => {
        console.log('test')
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

function startElectron () {
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
  greeting()
  try {
    await startRenderer()
  } catch (error) {
    console.log(error)
  }
}

init()
