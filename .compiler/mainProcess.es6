import path from 'path'
import webpack from 'webpack'
import logStats from './logStats'
import { mainConfig } from './webpack'

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

export default startMain
