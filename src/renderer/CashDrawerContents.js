const billValues = [100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05]

class Bill {
  constructor (amount, count = 0) {
    this.amount = amount
    this.count = count
  }

  total () {
    return this.amount * this.count
  }
}

export default class CashDrawerContents {
  constructor () {
    this.bills = billValues.map(value => new Bill(value))
    this.emergencyCash = 0
  }

  total (includeEmergencyCash = true) {
    return this.bills.reduce((sum, current) => sum + current.total(), 0) + (includeEmergencyCash ? this.emergencyCash : 0)
  }

  supportsPredictions () {
    return false
  }

  supportsEmergencyCash () {
    return true
  }

  static fromFile (json) {
    const cashDrawerContents = new CashDrawerContents()

    json.bills.forEach(bill => { cashDrawerContents.bills.find(b => b.amount === bill.amount).count = bill.count })
    this.emergencyCash = json.emergencyCash

    return cashDrawerContents
  }
}
