import express from 'express'
import path from 'path'
import basicAuth from 'express-basic-auth'
import Routes from '../web/routes'

export default class {
  setDataPath (dataPath) {
    this.dataPath = dataPath
    return this
  }

  start () {
    const app = express()

    app.use(basicAuth({
      users: { 'admin': 'supersecret' },
      challenge: true,
      realm: 'DWH Kassa'
    }))

    app.set('view engine', 'pug')

    app.use(express.static(path.join(__dirname, '../web/static')))
    app.set('views', path.join(__dirname, '../web/views'))

    app.use('/', new Routes().setDataPath(this.dataPath).get())

    app.listen(3000)

    return app
  }
}
