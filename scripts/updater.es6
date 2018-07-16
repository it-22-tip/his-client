import extractZip from 'extract-zip'
import path from 'path'
import { copy } from 'fs-extra'
const extract = Promise.promisify(extractZip)
// const cp = Promise.promisify(copyFile)
let rootPath = path.resolve(__dirname, '..')
let externalPath = path.join(rootPath, 'external')
let src = path.join(externalPath, 'vue-material-dev.zip')
let target = externalPath
let cpSrc = path.join(externalPath, 'vue-material-dev', 'src')
let tgtSrc = path.join(rootPath, 'src', 'vue-material', 'dev')
extract(src, {dir: target})
  .then(
    () => {
      console.log('extract success')
      copy(cpSrc, tgtSrc, { overwrite: true })
        .then(
          () => {
            console.log('copy success')
          }
        )
        .catch(
          e => {
            console.log(e)
          }
        )
    }
  )
  .catch(
    e => {
      console.log(e)
    }
  )
