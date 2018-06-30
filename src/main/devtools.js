'use-strict'
const devtools = async function () {
  const vuedevtools = await import('vue-devtools')
  const ElectronDevtoolsInstaller = await import('electron-devtools-installer')
  const devtron = await import('devtron')
  const { default: installExtension, VUEJS_DEVTOOLS } = ElectronDevtoolsInstaller
  devtron.install()
  installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
  vuedevtools.install()
}
export default devtools
