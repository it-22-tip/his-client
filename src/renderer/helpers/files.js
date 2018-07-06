import { stat as fsStat, readFile as fsReadFile, readdir as fsreaddir } from 'fs'
import yaml from 'js-yaml'
import XLSX from 'xlsx'
import Promise from 'bluebird'

const statAsync = Promise.promisify(fsStat)
const readFileAsync = Promise.promisify(fsReadFile)
const readDirAsync = Promise.promisify(fsreaddir)

const readAs = function (file, as) {
  if (!(file instanceof Blob)) {
    throw new TypeError('Must be a File or Blob')
  }
  /* eslint-disable */
  return new Promise(function (resolve, reject) {
    let reader = new FileReader()
    reader.onload = function (event) { resolve(event.target.result) }
    reader.onerror = function (event) { reject(new Error('Error reading' + file.name + ': ' + event.target.result)) }
    reader['readAs' + as](file)
  })
  /* eslint-enable */
}

const stat = function (args) {
  return statAsync(args)
}

const readFile = function (args) {
  return readFileAsync(args)
}

const readDir = function (args) {
  return readDirAsync(args)
}

const readYAML = async function (args) {
  const content = await readFileAsync(args)
  return yaml.safeLoad(content.toString())
}

const readJSON = async function (args) {
  const content = await readFileAsync(args)
  return JSON.parse(content.toString())
}

const readAsDataURL = function (file) {
  return readAs(file, 'DataURL')
}

const readAsText = function (file) {
  return readAs(file, 'Text')
}

const readAsArrayBuffer = function (file) {
  return readAs(file, 'ArrayBuffer')
}

const writeXLSX = function (sheetName, source, target) {
  let wb = XLSX.utils.book_new()
  let sheet = XLSX.utils.json_to_sheet(source)
  XLSX.utils.book_append_sheet(wb, sheet, sheetName)
  XLSX.writeFile(wb, target)
}

const readXLSX = async function (path, sheet) {
  let file
  let workbook
  let value = {}
  try {
    file = await this.readFile(path)
    workbook = XLSX.read(file)
    let { Sheets, SheetNames } = workbook
    for (let Sheet of SheetNames) {
      if (Sheet !== sheet) continue
      value[sheet] = XLSX.utils.sheet_to_json(Sheets[Sheet])
    }
  } catch (error) {
    throw error
  }
  return value
}

export {
  stat,
  readFile,
  readAsArrayBuffer,
  readAsDataURL,
  readAsText,
  readXLSX,
  readJSON,
  readDir,
  readYAML,
  writeXLSX
}
