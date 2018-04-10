import fs from 'fs'

/**
 * path: 'string'
 * return Promise
 */
async function readFile (path) {
  let file = await new Promise((resolve, reject) => {
    let content = fs.readFileSync(path, 'utf8')
    resolve(content)
  })
  return file
}

/**
 * path: 'string'
 * return Promise
 */
async function readJSON (path) {
  let file = await readFile(path)
  return JSON.parse(file)
}

export { readFile, readJSON }
