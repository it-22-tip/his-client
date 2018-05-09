import { RendererPath, MainPath } from '../constant'
import path from 'path'
const alias = {
  // vue-material start
  'components': path.join(RendererPath, 'vue-material', 'src', 'components'),
  'vue-material/material': path.join(RendererPath, 'vue-material', 'src', 'material.js'),
  'core': path.join(RendererPath, 'vue-material', 'src', 'core'),
  'theme': path.join(RendererPath, 'vue-material', 'src', 'theme'),
  // vue-material end
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
export default alias
