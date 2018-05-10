import path from 'path'
import { CompilerPath } from '../../constant'
const workerLoader = {
  test: /\.worker\.js$/,
  exclude: /node_modules/,
  use: { loader: path.join(CompilerPath, 'worker-loader') }
}
export default workerLoader
