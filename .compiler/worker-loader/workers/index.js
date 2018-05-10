'use strict'

import path from 'path'

var path2 = interopRequireDefault(path).default

function interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  }
}

var getWorker = function getWorker (file, content, options) {
  var publicPath = options.publicPath ? JSON.stringify(options.publicPath) : '__webpack_public_path__'

  var publicWorkerPath = `${publicPath} + ${JSON.stringify(file)}`

  if (options.inline) {
    var InlineWorkerPath = JSON.stringify(`!!${path2.join(__dirname, 'InlineWorker.js')}`)

    var fallbackWorkerPath = options.fallback === false ? 'null' : publicWorkerPath

    return `require(${InlineWorkerPath})(${JSON.stringify(content)}, ${fallbackWorkerPath})`
  }

  return `new Worker(${publicWorkerPath})`
}
export default getWorker
