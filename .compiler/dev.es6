'use strict'

import mainServer from './server/mainServer'
import rendererServer from './server/rendererServer'
import nodeServer from './server/nodeServer';
// import { greeting } from './consoleLogger'

const init = async function () {
  // greeting()
  try {
    await nodeServer()
    const renderer = await rendererServer()
    renderer.on('build-finished', mainServer)
  } catch (error) {
    console.log(error)
  }
}

init()
