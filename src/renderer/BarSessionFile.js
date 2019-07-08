import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import uniqueFilename from 'unique-filename'
import BarSession from './BarSession'
import BarSessionType from './BarSessionType'

const userDataPath = path.join(remote.app.getPath('userData'))
const prefix = 'sessionv2'

export default class BarSessionFile {
  constructor (filePath) {
    this.filePath = filePath
  }

  static fromTypeAndDate (type, date) {
    const filePath = uniqueFilename(userDataPath, prefix + '-' + date.getTime() + '-' + type.id) + '.json'

    return new BarSessionFile(filePath)
  }

  static all () {
    return fs.readdirSync(userDataPath)
      .filter(file => file.startsWith(prefix))
      .map(file => new BarSessionFile(path.join(userDataPath, file)))
      .sort()
      .reverse()
  }

  store (barSession) {
    fs.writeFileSync(this.filePath, JSON.stringify(barSession))
  }

  read () {
    const fileContents = fs.readFileSync(this.filePath, 'utf8')
    const rawObject = JSON.parse(fileContents)

    return BarSession.fromFile(this, rawObject)
  }

  parseType () {
    const parts = path.basename(this.filePath).split('-')

    return BarSessionType.getById(parts[2])
  }

  parseDate () {
    const parts = path.basename(this.filePath).split('-')

    return new Date(parseInt(parts[1]))
  }
}
