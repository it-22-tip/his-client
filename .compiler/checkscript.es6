import * as Constant from './constant.es6'
import chalk from 'chalk'
import { argv } from 'yargs'

if (argv.show) {
  let text = `showing help script
  ok bos`
  console.log(chalk.yellow(text))
}

console.log(Constant)
