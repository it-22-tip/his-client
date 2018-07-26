const is_prod = process.env.NODE_ENV === 'production'
const mode = is_prod ? 'development' : 'production'
const devtool = is_prod ? '#cheap-module-eval-source-map' : ''
const node__dirname = !is_prod
const node__filename = !is_prod
export { is_prod, mode, devtool, node__dirname, node__filename }
