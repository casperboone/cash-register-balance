import CashState from './CashState'

export default class BarSession {
  constructor () {
    this.initialCashState = new CashState()
    this.finalCashState = new CashState()

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
    return this.effluentCashState().total()
  }

  changeSafeTotal () {
    return this.finalCashState.total() - this.effluentTotal()
  }

  effluentCashState () {
    var state = new CashState(false)

    // Always put all 50 and 100 euro bills in the grey safe
    state.bills[0].count = this.finalCashState.bills[0].count
    state.bills[1].count = this.finalCashState.bills[1].count

    // Starting with the 20 euro bills, put more in the grey safe until the remainder
    // is close to 200
    var nextBill = 2
    while (this.finalCashState.total() - state.total() > 220) {
      state.bills[nextBill].count = Math.min(
        this.finalCashState.bills[nextBill].count,
        Math.floor((this.finalCashState.total() - state.total() - 200) / state.bills[nextBill].amount)
      )
      nextBill++
    }

    return state
  }
}
