import path from 'path'
import { readdir as fsreaddir, stat as fsstat, writeFileSync } from 'fs'
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
        // let re = /.*\.test\.js$/
        // if (!re.test(pathToFile)) continue
        let content = await readFile(pathToFile)
        content = content.toString()
        content = content.replace(/avoriaz/, '@vue/test-utils')
        content = content.replace(/(\w+\.)hasClass\((['\w-]+)\)+\.toBe\(true\)/g, '$1classes()).toContain($2)')
        content = content.replace(/(\w+\.)hasClass\((['\w-]+)\)+\.toBe\(false\)/g, '$1classes()).not.toContain($2)')
        content = content.replace(/(\w+\.)hasAttribute\((['\w-]+)\)+\.toBe\(true\)/g, 'Object.keys($1attributes())).toContain($2)')
        content = content.replace(/(\w+\.)hasAttribute\((['\w-]+)\)+\.toBe\(false\)/g, 'Object.keys($1attributes())).not.toContain($2)')
        content = content.replace(/(\w+\.)hasAttribute\('([\w-]+)', (['\w-]+)\)+\.toBe\(true\)/g, '$1attributes().$2).toBe($3)')
        content = content.replace(/(wrapper|rootWrapper|testWrapper|input|label)\.getAttribute\('([\w]+-?[\w]*)'\)+\.toBe\(('?(.*)'?)\)/g, '$1.attributes().$2).toBe($3)')
        content = content.replace(/(^\s+data:\s)(\{\n\s+.+\n\s+\})/gm, '$1 () => ($2)')
        content = content.replace(/\.find\((.*)\)\[(\d)\]/g, '.findAll($1).at($2)')
        content = content.replace(/Lorem ipsum\s/g, 'Lorem ipsum')
        content = content.replace(/\.data\(\)\./g, '.vm.')
        writeFileSync(pathToFile, content, {encoding: 'utf8'})
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
