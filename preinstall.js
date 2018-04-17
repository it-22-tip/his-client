const packageJson = require('./package.json')
// const fs = require('fs')
const path = require('path')
const electronVersion = packageJson.devDependencies.electron
const arch = process.arch
const platform = process.platform
const moduleName = 'node_sqlite3'
const nodeVersion = process.versions.modules
const distUrl = 'https://atom.io/download/atom-shell'
const modulePath = path.resolve('./node_modules', 'sqlite3', 'lib', 'binding', `node-v${nodeVersion}-${platform}-${arch}`)

let SQLITE3_CONFIGURE = `node-gyp configure --module_name=${moduleName} --module_path=${modulePath}`

let SQLITE3_REBUILD = `node-gyp rebuild --target=${electronVersion} --arch=${arch} --target_platform=${platform} --dist-url=${distUrl} --module_name=${moduleName} --module_path=${modulePath}`

packageJson.scripts['sqlite3:postinstall'] = 'cd node_modules/sqlite3; npm run prepublish;' + ' ' + SQLITE3_CONFIGURE + ' ' + SQLITE3_REBUILD

console.log(JSON.stringify(packageJson, null, 4))
/*
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4))
*/
