'use-strict'
const devtools = async function () {
  const ElectronDevtoolsInstaller = await import('electron-devtools-installer')
  const devtron = await import('devtron')
  const { default: installExtension, VUEJS_DEVTOOLS } = ElectronDevtoolsInstaller
  devtron.install()
  installExtension(VUEJS_DEVTOOLS.id)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
}
export default devtools
