import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const cssLoader = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}
export default cssLoader
