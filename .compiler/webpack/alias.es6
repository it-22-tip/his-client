import { RendererPath, MainPath } from '../constant'
import path from 'path'

const Ver = '1.0.0-beta-10.2'
const VueMaterialPath = path.join(RendererPath, 'vue-material', Ver)

const VueMaterialAlias = {
  'components': path.join(VueMaterialPath, 'components'),
  'vue-material/material': path.join(VueMaterialPath, 'material.js'),
  'core': path.join(VueMaterialPath, 'core'),
  'theme': path.join(VueMaterialPath, 'theme')
}

const BaseAlias = {
  '@pages': path.join(RendererPath, 'components', 'pages'),
  '@partials': path.join(RendererPath, 'components', 'partials'),
  '@extras': path.join(RendererPath, 'components', 'extras'),
  '@helpers': path.join(RendererPath, 'helpers'),
  '@mixins': path.join(RendererPath, 'mixins'),
  '@windowDefinitions': path.join(MainPath, 'windowDefinitions'),
  '@windowUrls': path.join(MainPath, 'windowUrls'),
  '@': RendererPath,
  'vue$': 'vue/dist/vue.esm.js'
}

export { VueMaterialAlias, BaseAlias }
