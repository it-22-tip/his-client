import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const sassLoader = {
  test: /\.(scss|sass)$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    },
    'sass-loader'
  ]
}
export default sassLoader
