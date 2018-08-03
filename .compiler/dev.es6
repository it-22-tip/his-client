'use strict'

import mainServer from './mainServer'
import rendererServer from './rendererServer'
import { greeting } from './consoleLogger'

const init = async function () {
  greeting()
  try {
    const renderer = await rendererServer()
    renderer.on('build-finished', mainServer)
  } catch (error) {
    console.log(error)
  }
}

init()
