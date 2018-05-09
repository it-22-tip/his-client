const rawLoader = {
  test: /\.(md|txt)(\?.*)?$/,
  use: {
    loader: 'raw-loader'
  }
}
export default rawLoader
