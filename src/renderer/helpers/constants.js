import path from 'path'
import os from 'os'
import { remote } from 'electron'
const { getPath } = remote.app
const { homedir, platform } = os

const homePath = homedir()
const appDataPath = path.join(homePath, '/.hisdata')
const electronVersion = process.versions['atom-shell']
const osPlatform = platform()
const nodeVersion = process.versions['node']

const appData = getPath('appData')
const userData = getPath('userData')
const temp = getPath('temp')

export {
  homePath,
  appDataPath,
  electronVersion,
  osPlatform,
  nodeVersion,
  appData,
  userData,
  temp
}
