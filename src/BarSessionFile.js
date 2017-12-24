import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import uniqueFilename from 'unique-filename'
import BarSession from './BarSession'
import Bill from './Bill'
import BarSessionType from './BarSessionType'

const userDataPath = path.join(remote.app.getPath('userData'))
const prefix = 'session'

export default class BarSessionFile {
  constructor (filePath = this.generateFilePath()) {
    this.filePath = filePath
  }

  static all () {
    return fs.readdirSync(userDataPath)
      .filter(file => file.startsWith(prefix))
      .map(file => new BarSessionFile(path.join(userDataPath, file)))
  }

  store (barSession) {
    fs.writeFileSync(this.filePath, JSON.stringify(barSession))
  }

  read () {
    const fileContents = fs.readFileSync(this.filePath, 'utf8')
    const rawObject = JSON.parse(fileContents)

    const barSession = new BarSession(this)

    barSession.date = new Date(rawObject.date)
    barSession.type = BarSessionType.getById(rawObject.type.id)

    barSession.initialCashState.bills = rawObject.initialCashState.bills.map(bill => new Bill(bill.amount, bill.count))
    barSession.initialCashState.author = rawObject.initialCashState.author
    barSession.initialCashState.emergencyCash = rawObject.initialCashState.emergencyCash

    barSession.finalCashState.bills = rawObject.finalCashState.bills.map(bill => new Bill(bill.amount, bill.count))
    barSession.finalCashState.author = rawObject.finalCashState.author
    barSession.finalCashState.emergencyCash = rawObject.finalCashState.emergencyCash

    barSession._effluentCashState.bills = rawObject._effluentCashState.bills.map(bill => new Bill(bill.amount, bill.count))
    barSession._effluentCashState.author = rawObject._effluentCashState.author
    barSession._effluentCashState.emergencyCash = rawObject._effluentCashState.emergencyCash

    barSession.theoreticalCashTotal = rawObject.theoreticalCashTotal
    barSession.theoreticalPinTotal = rawObject.theoreticalPinTotal

    barSession.pinTerminalTotal = rawObject.pinTerminalTotal

    return barSession
  }

  generateFilePath () {
    return uniqueFilename(userDataPath, prefix) + '.json'
  }
}
