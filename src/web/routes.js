import express from 'express'
import fs from 'fs'
import path from 'path'
import { parse } from 'json2csv'
import moment from 'moment'

const prefix = 'sessionv2'

export default class {
  setDataPath (dataPath) {
    this.dataPath = dataPath
    return this
  }

  get () {
    const router = express.Router()

    router.get('/export', (req, res) => {
      const result = []

      const files = fs.readdirSync(this.dataPath)
        .filter(file => file.startsWith(prefix))
        .map(file => path.join(this.dataPath, file))
        .sort()

      const start = moment(req.query.start).hour(0).minute(0).second(0)
      const end = moment(req.query.end).hour(23).minute(59).second(59)

      let next = files.pop()
      while (files.length > 0 && getDateFromFileName(next) >= start) {
        if (getDateFromFileName(next) <= end) {
          result.push(readBarSession(next))
        }
        next = files.pop()
      }

      res.attachment('export_' + req.query.start + '.csv')
      res.send(parse(result, { flatten: true, delimiter: ';' }))
    })

    return router
  }
}

function getDateFromFileName (fileName) {
  const parts = fileName.split('-')

  return new Date(parseInt(parts[1]))
}

function readBarSession (fileName) {
  const fileContents = fs.readFileSync(fileName, 'utf8')
  const rawObject = JSON.parse(fileContents)

  return rawObject
}
