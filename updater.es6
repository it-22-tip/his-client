import extractZip from 'extract-zip'
import path from 'path'
import { copy } from 'fs-extra'
const extract = Promise.promisify(extractZip)
// const cp = Promise.promisify(copyFile)
let src = path.resolve('./external', 'vue-material-dev.zip')
let target = path.resolve('./external')
let cpSrc = path.resolve('./external', 'vue-material-dev', 'src')
let tgtSrc = path.resolve('./src', 'vue-material', 'dev')
extract(src, {dir: target})
  .then(
    () => {
      console.log('extract success')
      copy(cpSrc, tgtSrc)
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
