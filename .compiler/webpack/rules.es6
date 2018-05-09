import cssLoader from './loaders/cssLoader'
import sassLoader from './loaders/sassLoader'
import lessLoader from './loaders/lessLoader'
import fontLoader from './loaders/fontLoader'
import imageLoader from './loaders/imageLoader'
import mediaLoader from './loaders/mediaLoader'
import eslintLoader from './loaders/eslintLoader'
import workerLoader from './loaders/workerLoader';
import nodeLoader from './loaders/nodeLoader';
import vueLoader from './loaders/vueLoader';
import babelLoader from './loaders/babelLoader';
import vueHtmlLoader from './loaders/vueHtmlLoader';

const baseRules = [
  workerLoader,
  eslintLoader,
  vueLoader,
  cssLoader,
  sassLoader,
  lessLoader,
  vueHtmlLoader,
  babelLoader,
  nodeLoader,
  mediaLoader,
  imageLoader,
  fontLoader,
  {
    test: /\.(md|txt)(\?.*)?$/,
    use: {
      loader: 'raw-loader'
    }
  }
]

const rules = [].concat(baseRules)

export default rules
