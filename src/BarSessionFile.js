import { remote } from 'electron'
import fs from 'fs'
import uniqueFilename from 'unique-filename'
import BarSession from './BarSession'
import CashState from './CashState'
import Bill from './Bill'

const userDataPath = remote.app.getPath('userData')

export default class BarSessionFile {
  constructor (filePath = this.generateFilePath()) {
    this.filePath = filePath
  }

  store (barSession) {
    fs.writeFileSync(this.filePath, JSON.stringify(barSession))
  }

  read () {
    const fileContents = fs.readFileSync(this.filePath, 'utf8')
    const rawObject = JSON.parse(fileContents)

    const barSession = new BarSession(this)

    barSession.initialCashState = new CashState()
    barSession.initialCashState.bills = rawObject.initialCashState.bills.map(bill => new Bill(bill.amount, bill.count))
    barSession.initialCashState.author = rawObject.initialCashState.author
    barSession.initialCashState.emergencyCash = rawObject.initialCashState.emergencyCash

    barSession.finalCashState = new CashState()
    barSession.finalCashState.bills = rawObject.finalCashState.bills.map(bill => new Bill(bill.amount, bill.count))
    barSession.finalCashState.author = rawObject.finalCashState.author
    barSession.finalCashState.emergencyCash = rawObject.finalCashState.emergencyCash
    barSession.initialCashState.emergencyCash = rawObject.initialCashState.emergencyCash

    barSession._effluentCashState = new CashState()
    barSession._effluentCashState.bills = rawObject._effluentCashState.bills.map(bill => new Bill(bill.amount, bill.count))
    barSession._effluentCashState.author = rawObject._effluentCashState.author
    barSession._effluentCashState.emergencyCash = rawObject._effluentCashState.emergencyCash

    barSession.theoreticalCashTotal = rawObject.theoreticalCashTotal
    barSession.theoreticalPinTotal = rawObject.theoreticalPinTotal

    barSession.pinTerminalTotal = rawObject.pinTerminalTotal

    return barSession
  }

  generateFilePath () {
    return uniqueFilename(userDataPath, 'asdf') + '.json'
  }
}
