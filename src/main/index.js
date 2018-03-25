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
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL + '/index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createPrinterWorkerWindow () {
  printerWorkerWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })
  printerWorkerWindow.loadURL(winURL + '/printer_worker.html')
  // printerWorkerWindow.hide();
  printerWorkerWindow.webContents.openDevTools()
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

// const os = require('os')
// const fs = require('fs')
// const path = require('path')
ipcMain.on('readyToPrint', (event) => {
  // const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  // Use default printing options
  // printerWorkerWindow.webContents.printToPDF({pageSize: {width: 72000, height: 210000}}, function (error, data) {
  //   if (error) throw error
  //   fs.writeFile(pdfPath, data, function (error) {
  //     if (error) {
  //       throw error
  //     }
  //     console.log(pdfPath)
  //     event.sender.send('wrote-pdf', pdfPath)
  //   })
  // })
  console.log('new printing yay')
  printerWorkerWindow.webContents.print()
})

ipcMain.on('print', (event, content) => {
  console.log(content)
  printerWorkerWindow.webContents.send('print', 'hoi' + content)
})
