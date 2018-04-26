import path from 'path'
import os from 'os'
import { remote } from 'electron'
const { app } = remote

const homePath = os.homedir()
const appDataPath = path.join(homePath, '/.hisdata')
const electronVersion = process.versions['atom-shell']
const osPlatform = os.platform()
const nodeVersion = process.versions['node']

const appData = app.getPath('appData')
const userData = app.getPath('userData')
const temp = app.getPath('temp')

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
