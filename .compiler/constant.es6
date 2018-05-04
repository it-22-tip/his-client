'use-strict'
import path from 'path'
import PackageJSON from '../package.json'
const RootPath = path.join(__dirname, '..')
const SrcPath = path.join(RootPath, 'src')
const CompilerPath = path.join(RootPath, '.compiler')
const NodeModulesPath = path.join(RootPath, 'node_modules')
const StaticPath = path.join(RootPath, 'static')
const RendererPath = path.join(SrcPath, 'renderer')
const RendererEntry = path.join(RendererPath, 'main.js')
const MainPath = path.join(SrcPath, 'main')
const MainEntry = path.join(MainPath, 'index.js')
const dependencies = PackageJSON.dependencies
const devDependencies = PackageJSON.devDependencies
const DistPath = path.join(RootPath, 'dist')
const OutputPath = path.join(DistPath, 'electron')

export {
  dependencies,
  devDependencies,
  RootPath,
  SrcPath,
  CompilerPath,
  NodeModulesPath,
  StaticPath,
  RendererPath,
  RendererEntry,
  MainPath,
  MainEntry,
  DistPath,
  OutputPath
}