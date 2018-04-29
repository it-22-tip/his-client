'use-strict'
import ElectronDevtoolsInstaller from 'electron-devtools-installer'
import devtron from 'devtron'
const { default: installExtension, VUEJS_DEVTOOLS } = ElectronDevtoolsInstaller
const devtools = function () {
  devtron.install()
  installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
}
export default devtools
