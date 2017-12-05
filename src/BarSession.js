import CashState from './CashState'

export default class BarSession {
  constructor () {
    this.initialCashState = new CashState()
    this.finalCashState = new CashState()
    this.effluentCashState = new CashState(false)

    this.theoreticalCashTotal = 0
    this.theoreticalPinTotal = 0

    this.pinTerminalTotal = 0
  }

  cashDifferenceTotal () {
    return this.finalCashState.total() - this.initialCashState.total()
  }

  revenueTotal () {
    return this.cashDifferenceTotal() + this.pinTerminalTotal
  }

  effluentTotal () {
    return this.effluentCashState.total()
  }

  changeSafeTotal () {
    return this.revenueTotal() - this.effluentTotal()
  }

  totalToRemove () {
    // Reset money to put in the grey safe
    this.effluentCashState.bills.map(bill => { bill.count = 0 })

    // Always put all 50 and 100 euro bills in the grey safe
    this.effluentCashState.bills[0].count = this.finalCashState.bills[0].count
    this.effluentCashState.bills[1].count = this.finalCashState.bills[1].count

    // Starting with the 20 euro bills, put more in the grey safe until the remainder
    // is close to 200
    var nextBill = 2
    while (this.finalCashState.total() - this.effluentCashState.total() > 220) {
      if (this.finalCashState.bills[nextBill].count > this.effluentCashState.bills[nextBill].count) {
        this.effluentCashState.bills[nextBill].count++
      } else {
        nextBill++
      }
    }
  }
}
