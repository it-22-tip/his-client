'use-strict'

if (process.env.NODE_ENV === 'development') {
  const devtools = require('electron-devtools-installer')
  const devtron = require('devtron')
  const { default: installExtension, VUEJS_DEVTOOLS } = devtools
  devtron.install()
  installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
}
