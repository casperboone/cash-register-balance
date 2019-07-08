'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, printerWorkerWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}`

function createMainWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({ fullscreen: true })

  mainWindow.loadURL(winURL + '/index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createPrinterWorkerWindow () {
  printerWorkerWindow = new BrowserWindow()
  printerWorkerWindow.loadURL(winURL + '/printer_worker.html')
  // printerWorkerWindow.hide()
  printerWorkerWindow.on('closed', () => {
    printerWorkerWindow = null
  })
}

app.on('ready', () => {
  createMainWindow()
  createPrinterWorkerWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
  if (printerWorkerWindow === null) {
    createPrinterWorkerWindow()
  }
})

ipcMain.on('readyToPrint', (event) => {
  printerWorkerWindow.webContents.print({ silent: true })
})

ipcMain.on('print', (event, content) => {
  printerWorkerWindow.webContents.send('print', content)
})
