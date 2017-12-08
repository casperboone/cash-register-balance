import Bill from './Bill'

const billValues = [100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05]

export default class CashState {
  constructor (editable = true) {
    this.bills = billValues.map(value => new Bill(value))
    this.emergencyCash = 0
    this.author = ''
    this.editable = editable
  }

  total () {
    return this.bills.reduce((sum, current) => sum + current.total(), 0) + this.emergencyCash
  }
}
