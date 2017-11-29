export default class Bill {
  constructor (amount) {
    this.amount = amount
    this.count = 0
  }

  total () {
    return this.amount * this.count
  }
}
