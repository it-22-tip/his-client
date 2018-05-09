import workerLoader from '../loaders/workerLoader'
import eslintLoader from '../loaders/eslintLoader'
import vueLoader from '../loaders/vueLoader'
import cssLoader from '../loaders/cssLoader'
import sassLoader from '../loaders/sassLoader'
import lessLoader from '../loaders/lessLoader'
import vueHtmlLoader from '../loaders/vueHtmlLoader'
import babelLoader from '../loaders/babelLoader'
import imageLoader from '../loaders/imageLoader'
import fontLoader from '../loaders/fontLoader'

const testRules = [
  workerLoader,
  eslintLoader,
  vueLoader,
  cssLoader,
  sassLoader,
  lessLoader,
  vueHtmlLoader,
  babelLoader,
  imageLoader,
  fontLoader
]
export default testRules
