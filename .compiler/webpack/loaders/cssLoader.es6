import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import postcssLoader from './postcssLoader'
const loaders = [
  process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader'
  },
  postcssLoader
]
const cssLoader = {
  test: /\.css$/,
  use: loaders
}
export default cssLoader
