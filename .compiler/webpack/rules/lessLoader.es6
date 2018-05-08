import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const lessLoader = {
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    },
    'less-loader'
  ]
}
export default lessLoader
