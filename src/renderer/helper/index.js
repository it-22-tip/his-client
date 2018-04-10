'use-strict'

import fs from 'fs'
import os from 'os'
import { default as Promise } from 'bluebird'
import YAML from 'js-yaml'
const readDir = Promise.promisify(fs.readdir)
const readFile = Promise.promisify(fs.readFile)
const stat = Promise.promisify(fs.stat)

const readJSON = async function (path) {
  let content = null
  try {
    content = await readFile(path)
  } catch (error) {
    throw error
  }
  try {
    content = JSON.parse(content)
  } catch (error) {
    throw error
  }
  return content
}

const readYaml = async function (path) {
  let content = null
  try {
    content = await readFile(path)
  } catch (error) {
    throw error
  }
  try {
    content = YAML.safeLoad(content)
  } catch (error) {
    throw error
  }
  return content
}

const homeDir = function (path) {
  return os.homedir() + path
}

const exists = async function (path) {
  const value = await stat(path)
  return value
}

const readDirRecursive = function (path) {
  let recursive = async (root) => {
    let dirs = []
    let files = []
    dirs.push(root)
    let readDir = async (root) => {
      let items = await readDir(root)
      for (let item of items) {
        let fpath = path.join(root, item)
        let stats = await stat(fpath)
        if (stats.isDirectory()) {
          dirs.push(fpath)
          await readDir(fpath)
        } else {
          files.push(fpath)
        }
      }
      return {dirs, files}
    }
    return readDir(root)
      .then(result => { return result })
      // .catch(error => { throw err })
  }
  recursive(path)
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
}

export default {
  readDir,
  readDirRecursive,
  readFile,
  readYaml,
  readJSON,
  stat,
  homeDir,
  exists
}
