'use-strict'
const os = require('os')
const fs = require('fs')
const Promise = require('bluebird')
const path = require('path')
const writeFile = Promise.promisify(fs.writeFile)
const stat = Promise.promisify(fs.stat)
const home = os.homedir()
const datapath = path.resolve(home, '.hisdata')

let contentdatapath = `,
    {
      "path": "${datapath}"
    }`

const content = `{
  "folders": [
    {
      "path": "."
    }${contentdatapath}
  ],
  "settings": {}
}`

const writeWorkSpace = async function () {
  let exists = await stat(datapath)
    .then(() => { return true })
    .catch(() => { return false })

  if (!exists) {
    console.log('please create directory')
    return false
  }

  return writeFile('vuehis.code-workspace', content)
    .then(
      () => {
        console.log('success')
        return true
      }
    )
    .catch(
      () => {
        console.log('failed')
        return false
      }
    )
}

if (writeWorkSpace()) return 0
