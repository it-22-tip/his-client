'use strict'

import chalk from 'chalk'
import del from 'del'
import webpack from 'webpack'
import Multispinner from 'multispinner'
import { mainConfig, rendererConfig } from './webpack/config'
import { greeting2 } from './consoleLogger'

const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '
// process.env.NODE_ENV = 'production'
const isCI = process.env.CI || false

if (process.env.BUILD_TARGET === 'clean') clean()
else build()

function clean () {
  del.sync(['build/*', '!build/icons', '!build/icons/icon.*'])
  console.log(`\n${doneLog}\n`)
  process.exit()
}

function build () {
  greeting2(isCI)

  del.sync(['dist/electron/*', '!.gitkeep'])

  const tasks = ['main', 'renderer']
  const spinner = new Multispinner(tasks, {
    preText: 'building',
    postText: 'process'
  })

  let results = ''

  spinner.on('success', () => {
    process.stdout.write('\x1B[2J\x1B[0f')
    console.log(`\n\n${results}`)
    console.log(`${okayLog}take it away ${chalk.yellow('`electron-builder`')}\n`)
    process.exit()
  })

  pack(mainConfig).then(result => {
    results += result + '\n\n'
    spinner.success('main')
  }).catch(err => {
    spinner.error('main')
    console.log(`\n  ${errorLog}failed to build main process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })

  pack(rendererConfig).then(result => {
    results += result + '\n\n'
    spinner.success('renderer')
  }).catch(err => {
    spinner.error('renderer')
    console.log(`\n  ${errorLog}failed to build renderer process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

function pack (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) {
        let err = ''

        stats.toString({
          chunks: false,
          colors: true
        })
          .split(/\r?\n/)
          .forEach(line => {
            err += `    ${line}\n`
          })

        reject(err)
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  })
}
