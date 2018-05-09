import eslintLoader from '../loaders/eslintLoader'
import babelLoader from '../loaders/babelLoader'
import nodeLoader from '../loaders/nodeLoader'
const mainRules = [
  eslintLoader,
  babelLoader,
  nodeLoader
]
export default mainRules
