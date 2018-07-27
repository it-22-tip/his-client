const isProd = process.env.NODE_ENV === 'production'
const mode = isProd ? 'development' : 'production'
const devTool = isProd ? '#cheap-module-eval-source-map' : ''
const nodeDirname = !isProd
const nodeFilename = !isProd
export { isProd, mode, devTool, nodeDirname, nodeFilename }
