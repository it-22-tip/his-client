// (\w+\.)(hasClass)\((['\w-]+).+
// $1$2($3)).toContain($3)
import path from 'path'
import { readdir as fsreaddir, stat as fsstat } from 'fs'
import { readFile } from './src/renderer/helpers/files'
const readdir = Promise.promisify(fsreaddir)
const stat = Promise.promisify(fsstat)
const recur = async function (dir) {
  let fileNames = []
  const getAllFile = async function (dir) {
    let files = await readdir(dir)
    for (let fileName of files) {
      let pathToFile = path.resolve(dir + '/' + fileName)
      let fileStat = await stat(pathToFile)
      if (fileStat.isFile()) {
        let re = /.*\.test\.js$/
        if (!re.test(pathToFile)) continue
        let content = await readFile(pathToFile)
        content = content.toString()
        console.log(content.search(/avoriaz/))
        fileNames.push(pathToFile)
      } else {
        await getAllFile(pathToFile)
      }
    }
    return fileNames
  }
  await getAllFile(dir)
  return fileNames
}

recur('./src/vue-material').then(
  file => {
    // console.log(file)
  }
)
