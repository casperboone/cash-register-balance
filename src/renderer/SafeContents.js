import CashDrawerContents from './CashDrawerContents'

const targetAmountCashDrawerContents = 200

export default class SafeContents extends CashDrawerContents {
  constructor (cashAtEnd) {
    super() // needed ?

    this.cashAtEnd = cashAtEnd
    this.predicted = false
  }

  supportsPredictions () {
    return true
  }

  supportsEmergencyCash () {
    return false
  }

  predict (force = false) {
    if (this.predicted && !force) return
    this.predicted = true

    // Reset all counts of safe bills
    this.bills.forEach(b => { b.count = 0 })

    // Copy array
    const endBills = this.cashAtEnd.bills.slice().reverse()

    // Always put 100/50 euro bills in the safe
    this.bills.find(b => b.amount === 100).count = endBills.pop().count
    this.bills.find(b => b.amount === 50).count = endBills.pop().count

    // Pop bills until there is less than 220 euros in the cash drawer
    while (this.remainingCashInDrawer() > targetAmountCashDrawerContents && endBills.length) {
      const endBill = endBills.pop()

      const cashAmountThatNeedsToBeRemoved = this.remainingCashInDrawer() - targetAmountCashDrawerContents

      if (cashAmountThatNeedsToBeRemoved < endBill.total()) {
        this.bills.find(b => b.amount === endBill.amount).count = Math.floor(cashAmountThatNeedsToBeRemoved / endBill.amount)
      } else {
        this.bills.find(b => b.amount === endBill.amount).count = endBill.count
      }
    }
  }

  // Add note to UI that this does not include emergency cash
  remainingCashInDrawer (includeEmergencyCash = false) {
    return this.cashAtEnd.total(includeEmergencyCash) - this.total(false)
  }

  static fromFile (cashAtEnd, json) {
    const safeContents = new SafeContents(cashAtEnd)

    json.bills.forEach(bill => { safeContents.bills.find(b => b.amount === bill.amount).count = bill.count })
    safeContents.emergencyCash = json.emergencyCash
    safeContents.predicted = json.predicted

    return safeContents
  }
}
