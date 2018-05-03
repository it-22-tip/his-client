import { SrcPath, RootPath, CompilerPath, ElectronRendererPath, NodeModulesPath } from './webpack/constant.es6'
import path from 'path'
console.log(path.join(SrcPath, 'main'))
console.log(RootPath)
console.log(CompilerPath)
console.log(ElectronRendererPath)
console.log(NodeModulesPath)
