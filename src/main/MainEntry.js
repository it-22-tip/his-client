'use strict'
import { app, BrowserWindow, globalShortcut, Menu, ipcMain } from 'electron'
import createMenu from './createMenu'
import windowDefinitions from './windowDefinitions'
import windowUrls from './windowUrls'
import path from 'path'
let isDevelopment = true
let appName = 'his-client'

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
  isDevelopment = false
} else {
  app.setName(appName)
  app.setPath('userData', app.getPath('userData').replace(/Electron/i, appName))
}

// console.log(process.env)

let mainWindow
let introWindow

const { introUrl, mainUrl } = windowUrls

function createMainWindow () {
  const { mainDefinition, introDefinition } = windowDefinitions
  mainWindow = new BrowserWindow(mainDefinition)
  introWindow = new BrowserWindow(introDefinition)

  let showintro = function () {
    introWindow.center()
    introWindow.show()
  }

  let closeintroWindow = function (mainWindow) {
    if (introWindow) {
      setTimeout(function () {
        if (introWindow) {
          introWindow.close()
          introWindow = null
        }
      }, 4000)
    }
    setTimeout(function () {
      mainWindow.setContentProtection(true)
      mainWindow.show()
    }, 6000)
  }

  if (isDevelopment) {
    const devtools = async function () {
      const ElectronDevtoolsInstaller = await import('electron-devtools-installer')
      const devtron = await import('devtron')
      const { default: installExtension, VUEJS_DEVTOOLS } = ElectronDevtoolsInstaller
      devtron.install()
      installExtension(VUEJS_DEVTOOLS.id)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    }
    devtools()
  }

  if (!isDevelopment) introWindow.loadURL(introUrl)
  mainWindow.loadURL(mainUrl)

  mainWindow.on('closed', () => {
    app.quit()
    mainWindow = null
  })

  mainWindow.on('minimize', () => {
  })

  mainWindow.on('unresponsive', () => {
    app.quit()
  })

  introWindow.webContents.on('did-finish-load', () => {
    if (isDevelopment) {
      mainWindow.setContentProtection(true)
      mainWindow.show()
      return
    }
    showintro()
  })

  mainWindow.webContents.on('did-finish-load', () => {
    closeintroWindow(mainWindow)
    ipcMain.on('asynchronous-message', (event, arg) => {
      // manage data
      // console.log(arg)
      event.sender.send('selection', arg)
      mainWindow.webContents.send('selection', arg)
    })
  })

  mainWindow.webContents.on('will-navigate', (event) => {
    event.preventDefault()
  })
}

function createApplicationMenu (targetWindow) {
  const template = createMenu(targetWindow)
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
  createMainWindow()
  createApplicationMenu(mainWindow)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})
