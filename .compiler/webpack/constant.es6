'use-strict'
import path from 'path'
const RootPath = path.join(__dirname, '/../')
const SrcPath = path.join(__dirname, '../../src')
const CompilerPath = path.join(__dirname, '..')
const NodeModulesPath = path.join(__dirname, '../../node_modules/')
const StaticPath = path.join(__dirname, '../../static/')
const RendererPath = path.join(SrcPath, 'renderer')
const RendererEntry = path.join(RendererPath, 'main.js')
const MainPath = path.join(SrcPath, 'main')
const MainEntry = path.join(MainPath, 'index.js')

export { RootPath, SrcPath, CompilerPath, NodeModulesPath, StaticPath, RendererPath, RendererEntry, MainPath, MainEntry }
