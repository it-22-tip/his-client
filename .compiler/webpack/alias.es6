import { RendererPath, MainPath } from '../constant'
import { assign } from 'lodash'
import path from 'path'

const nodeModulesAlias = {
  'vue$': 'vue/dist/vue.esm.js'
}

const rendererAlias = {
  '@components': path.join(RendererPath, 'components'),
  '@pages': path.join(RendererPath, 'pages'),
  '@helpers': path.join(RendererPath, 'helpers'),
  '@mixins': path.join(RendererPath, 'mixins'),
  '@': RendererPath
}

const mainALias = {
  '@windowDefinitions': path.join(MainPath, 'windowDefinitions'),
  '@windowUrls': path.join(MainPath, 'windowUrls'),
}

export default assign({}, nodeModulesAlias, rendererAlias, mainALias)
