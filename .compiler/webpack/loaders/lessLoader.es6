import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import postcssLoader from './postcssLoader'
const loaders = [
  process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  postcssLoader,
  'less-loader'
]
const lessLoader = {
  test: /\.less$/,
  use: loaders
}
export default lessLoader
