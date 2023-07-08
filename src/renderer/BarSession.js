import BarSessionType from './BarSessionType'
import BarSessionFile from './BarSessionFile'

export default class BarSession {
  constructor () {
    this.date = new Date()
    this.type = BarSessionType.getDefaultForDate(this.date)
    this.originalAuthorName = ''
    this.closingAuthorName = ''

    this.posDataRetrieved = false
    this.posCashTotal = 0.0
    this.posPinTotal = 0.0
    this.posFreeTotal = 0.0
    this.posSlipTotal = 0.0

    this.actualFixedPinTotal = 0.0
    this.actualMobilePinTotal = 0.0

    this.file = undefined
  }

  actualTotal () {
    return this.actualFixedPinTotal + this.actualMobilePinTotal
  }

  theoreticalTotal () {
    return this.posCashTotal + this.posPinTotal
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

    barSession.posDataRetrieved = contents.posDataRetrieved
    barSession.posCashTotal = contents.posCashTotal
    barSession.posPinTotal = contents.posPinTotal
    barSession.posFreeTotal = contents.posFreeTotal
    barSession.posSlipTotal = contents.posSlipTotal

    barSession.actualFixedPinTotal = contents.actualFixedPinTotal
    barSession.actualMobilePinTotal = contents.actualMobilePinTotal

    barSession.file = file

    return barSession
  }
}
