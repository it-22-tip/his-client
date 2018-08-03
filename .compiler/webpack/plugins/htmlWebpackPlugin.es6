import { RendererTemplatePath, NodeModulesPath } from '../../constant'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default new HtmlWebpackPlugin({
  filename: 'index.html',
  template: RendererTemplatePath,
  minify: {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true
  },
  nodeModules: process.env.NODE_ENV !== 'production' ? NodeModulesPath : false
})
