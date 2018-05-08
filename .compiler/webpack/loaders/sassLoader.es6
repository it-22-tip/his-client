import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import postcssLoader from './postcssLoader'
const loaders = [
  process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  postcssLoader,
  'sass-loader'
]
const sassLoader = {
  test: /\.(scss|sass)$/,
  use: loaders
}
export default sassLoader
