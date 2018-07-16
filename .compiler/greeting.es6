import chalk from 'chalk'
import { say } from 'cfonts'

const greeting = function () {
  const cols = process.stdout.columns
  let text = ''

  if (cols > 85) text = 'bismillah'
  else if (cols > 60) text = 'bismika|Allahumma'
  else text = false

  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  electron-vue'))
  console.log(chalk.blue('  getting ready...') + '\n')
}

export default greeting
