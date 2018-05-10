import wl from '../../worker-loader'
const workerLoader = {
  test: /\.worker\.js$/,
  exclude: /node_modules/,
  use: { loader: '../../worker-loader' }
}
export default workerLoader
