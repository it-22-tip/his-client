import { stat as fsStat, readFile as fsReadFile, readdir as fsreaddir } from 'fs'
import { default as Promise } from 'bluebird'
import yaml from 'js-yaml'
import XLSX from 'xlsx'

const statAsync = Promise.promisify(fsStat)
const readFileAsync = Promise.promisify(fsReadFile)
const readDirAsync = Promise.promisify(fsreaddir)

function readAs (file, as) {
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

export default {
  created () {},
  methods: {
    stat (args) {
      return statAsync(args)
    },
    readFile (args) {
      return readFileAsync(args)
    },
    readDir (args) {
      return readDirAsync(args)
    },
    async readYAML (args) {
      const content = await readFileAsync(args)
      return yaml.safeLoad(content.toString())
    },
    async readJSON (args) {
      const content = await readFileAsync(args)
      return JSON.parse(content.toString())
    },
    readAsDataURL (file) {
      return readAs(file, 'DataURL')
    },
    readAsText (file) {
      return readAs(file, 'Text')
    },
    readAsArrayBuffer (file) {
      return readAs(file, 'ArrayBuffer')
    },
    writeXLSX (path) {
      let wb = XLSX.utils.book_new()
      let sheet = XLSX.utils.json_to_sheet(this.model)
      XLSX.utils.book_append_sheet(wb, sheet, 'employees')
      XLSX.writeFile(wb, '/home/idnes/.hisdata/test.xlsx')
    },
    async readXLSX (path, sheet) {
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
        console.log(error)
      }
      return value
    }
  }
}
