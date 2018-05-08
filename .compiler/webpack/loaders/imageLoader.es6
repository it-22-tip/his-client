const imageLoader = {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use: {
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: 'imgs/[name]--[folder].[ext]'
    }
  }
}
export default imageLoader
