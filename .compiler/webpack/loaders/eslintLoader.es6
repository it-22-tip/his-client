import EslintFriendlyFormatter from 'eslint-friendly-formatter'
const eslintLoader = {
    test: /\.(js|vue)$/,
    enforce: 'pre',
    exclude: /node_modules/,
    use: {
      loader: 'eslint-loader',
      options: {
        formatter: EslintFriendlyFormatter
      }
    }
  }
export default eslintLoader