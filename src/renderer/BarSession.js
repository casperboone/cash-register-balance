import BarSessionType from './BarSessionType'
import CashDrawerContents from './CashDrawerContents'
import SafeContents from './SafeContents'
import BarSessionFile from './BarSessionFile'

export default class BarSession {
  constructor () {
    this.date = new Date()
    this.type = BarSessionType.getDefaultForDate(this.date)
    this.originalAuthorName = ''
    this.closingAuthorName = ''

    this.cashAtStart = new CashDrawerContents()
    this.cashAtEnd = new CashDrawerContents()
    this.cashToSafe = new SafeContents(this.cashAtEnd) // Serialization note: SafeContents has extra fields

    this.posDataRetrieved = false
    this.posCashTotal = 0.0
    this.posPinTotal = 0.0
    this.posFreeTotal = 0.0

    this.actualPinTotal = 0.0

    this.file = undefined
  }

  saveToDisk () {
    if (!this.file) {
      this.file = BarSessionFile.fromTypeAndDate(this.type, this.date)
    }
    this.file.store(this)
  }

  static fromFile (file, contents) {
    const barSession = new BarSession()

    barSession.date = new Date(contents.date)
    barSession.type = BarSessionType.getById(contents.type.id)
    barSession.originalAuthorName = contents.originalAuthorName
    barSession.closingAuthorName = contents.closingAuthorName

    barSession.cashAtStart = CashDrawerContents.fromFile(contents.cashAtStart)
    barSession.cashAtEnd = CashDrawerContents.fromFile(contents.cashAtEnd)
    barSession.cashToSafe = SafeContents.fromFile(barSession.cashAtEnd, contents.cashToSafe)

    barSession.posDataRetrieved = contents.posDataRetrieved
    barSession.posCashTotal = contents.posCashTotal
    barSession.posPinTotal = contents.posPinTotal
    barSession.posFreeTotal = contents.posFreeTotal

    barSession.actualPinTotal = contents.actualPinTotal

    barSession.file = file

    return barSession
  }
}
