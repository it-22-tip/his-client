'use strict'

import electron from 'electron'
import path from 'path'
import { spawn } from 'child_process'
import webpack from 'webpack'
import WebpackServe from 'webpack-serve'
import { mainConfig, rendererConfig } from './webpack'
import { greeting, electronLog } from './consoleLogger'
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
    }
  }
  server = await WebpackServe({}, options)
  return server
}

function startMain () {
  mainConfig.entry.main = [path.join(MainPath, 'index.dev.js')].concat(mainConfig.entry.main)
  webpack(mainConfig)
  return Promise.resolve()
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
    await startMain()
    startElectron()
  } catch (error) {
    console.log(error)
  }
}

init()
