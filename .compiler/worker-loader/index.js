'use strict'

import Options from './options.json'
import SchemaUtils from 'schema-utils'
import LoaderUtils from 'loader-utils'
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin'
import SingleEntryPlugin from 'webpack/lib/SingleEntryPlugin'
import WebWorkerTemplatePlugin from 'webpack/lib/webworker/WebWorkerTemplatePlugin'
import Workers from './workers/'
import LoaderError from './LoaderError'

function interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  }
}

let Options2 = interopRequireDefault(Options).default
let LoaderUtils2 = interopRequireDefault(LoaderUtils).default
let SchemaUtils2 = interopRequireDefault(SchemaUtils).default
let NodeTargetPlugin2 = interopRequireDefault(NodeTargetPlugin).default
let SingleEntryPlugin2 = interopRequireDefault(SingleEntryPlugin).default
let WebWorkerTemplatePlugin2 = interopRequireDefault(WebWorkerTemplatePlugin).default
let Workers2 = interopRequireDefault(Workers).default
let LoaderError2 = interopRequireDefault(LoaderError).default

function loader () {}

function pitch (request) {
  let _this = this

  let options = LoaderUtils2.getOptions(this) || {};

  (0, SchemaUtils2)(Options2, options, 'Worker Loader')

  if (!this.webpack) {
    throw new LoaderError2({
      name: 'Worker Loader',
      message: 'This loader is only usable with webpack'
    })
  }

  this.cacheable(false)

  let cb = this.async()

  let filename = LoaderUtils2.interpolateName(this, options.name || '[hash].worker.js', {
    context: options.context || this.rootContext || this.options.context,
    regExp: options.regExp
  })

  let worker = {}

  worker.options = {
    filename,
    chunkFilename: `[id].${filename}`,
    namedChunkFilename: null
  }

  worker.compiler = this._compilation.createChildCompiler('worker', worker.options)

  worker.compiler.apply(new WebWorkerTemplatePlugin2(worker.options))

  if (this.target !== 'webworker' && this.target !== 'web') {
    worker.compiler.apply(new NodeTargetPlugin2())
  }

  worker.compiler.apply(new SingleEntryPlugin2(this.context, `!!${request}`, 'main'))

  let subCache = `subcache ${__dirname} ${request}`

  worker.compilation = function (compilation) {
    if (compilation.cache) {
      if (!compilation.cache[subCache]) {
        compilation.cache[subCache] = {}
      }

      compilation.cache = compilation.cache[subCache]
    }
  }

  if (worker.compiler.hooks) {
    let plugin = {
      name: 'WorkerLoader'
    }

    worker.compiler.hooks.compilation.tap(plugin, worker.compilation)
  } else {
    worker.compiler.plugin('compilation', worker.compilation)
  }

  worker.compiler.runAsChild(function (err, entries, compilation) {
    if (err) return cb(err)

    if (entries[0]) {
      worker.file = entries[0].files[0]

      worker.factory = (0, Workers2)(worker.file, compilation.assets[worker.file].source(), options)

      if (options.fallback === false) {
        delete _this._compilation.assets[worker.file]
      }

      return cb(null, `module.exports = function() {\n  return ${worker.factory};\n};`)
    }

    return cb(null, null)
  })
}

export { loader as default, pitch }
