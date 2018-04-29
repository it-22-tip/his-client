'use strict'
import { app, BrowserWindow, globalShortcut, Menu } from 'electron'
import createMenu from './createMenu'
import windowDefinitions from './windowDefinitions'
import windowUrls from './windowUrls'
import path from 'path'

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let introWindow

const { introUrl, mainUrl } = windowUrls

function createMainWindow () {
  const dev = process.env.NODE_ENV === 'development'
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

  if (dev) {
    const devtools = require('electron-devtools-installer')
    const devtron = require('devtron')
    const { default: installExtension, VUEJS_DEVTOOLS } = devtools
    devtron.install()
    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))
  }

  if (!dev) introWindow.loadURL(introUrl)
  mainWindow.loadURL(mainUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('minimize', () => {
  })

  mainWindow.on('unresponsive', () => {
    app.quit()
  })

  introWindow.webContents.on('did-finish-load', () => {
    if (dev) {
      mainWindow.setContentProtection(true)
      mainWindow.show()
      return
    }
    showintro()
  })

  mainWindow.webContents.on('did-finish-load', () => {
    closeintroWindow(mainWindow)
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
