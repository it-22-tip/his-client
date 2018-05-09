import webpack from 'webpack'
import { StaticPath } from '../../constant'
const constant = {}

if (process.env.NODE_ENV !== 'production') {
  constant['__static'] = `"${StaticPath.replace(/\\/g, '\\\\')}"`
} else {
  constant['process.env.NODE_ENV'] = JSON.stringify('production')
}
export default new webpack.DefinePlugin(constant)
