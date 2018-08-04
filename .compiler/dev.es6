'use strict'

import mainServer from './server/mainServer'
import rendererServer from './server/rendererServer'
import nodeServer from './server/nodeServer'

const init = async function () {
  try {
    await nodeServer()
    const renderer = await rendererServer()
    renderer.on('build-finished', mainServer)
  } catch (error) {
    console.log(error)
  }
}

init()
