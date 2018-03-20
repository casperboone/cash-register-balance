export default class Bill {
  constructor (amount, count = 0) {
    this.amount = amount
    this.count = count
  }

  total () {
    return this.amount * this.count
  }
}
