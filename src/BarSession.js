import CashState from './CashState'

export default class BarSession {
  constructor () {
    this.initialCashState = new CashState()
    this.finalCashState = new CashState()
    this.effluentCashState = new CashState()

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
}
