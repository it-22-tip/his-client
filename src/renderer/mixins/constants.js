import path from 'path'
import os from 'os'

const homePath = os.homedir()
const appDataPath = path.join(homePath, '/.hisdata')
const electronVersion = process.versions['atom-shell']
const osPlatform = os.platform()
const nodeVersion = process.versions['node']

export { homePath, appDataPath, electronVersion, osPlatform, nodeVersion }
