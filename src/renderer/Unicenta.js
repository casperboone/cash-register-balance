import mysql from 'mysql'

export default class Unicenta {
  connectAndExecute (action) {
    const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'admin',
      database: 'unicenta2021'
    })

    connection.connect()
    const result = action(connection)
    connection.end()

    return result
  }

  requestRawData (query) {
    return this.connectAndExecute(connection => {
      return new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
          if (error) throw error
          resolve(results)
        })
      })
    })
  }

  requestTotals () {
    return this.requestRawData(`
      SELECT closedcash.datestart as start_date, closedcash.dateend as end_date, payments.payment as type, 
      SUM(payments.TOTAL) AS amount 
      FROM (SELECT * FROM closedcash WHERE dateend IS NOT NULL ORDER BY dateend DESC LIMIT 1) as closedcash, payments, receipts 
      WHERE closedcash.money = receipts.money AND payments.receipt = receipts.id 
      GROUP BY closedcash.host, closedcash.hostsequence, closedcash.money, closedcash.datestart, closedcash.dateend, payments.payment 
      ORDER BY closedcash.host, closedcash.hostsequence
    `).then(results => {
      if (results.length === 0) return undefined

      return {
        startDate: results[0]['start_date'],
        endDate: results[0]['end_date'],

        pinTotal: this.findTotal(results, 'ccard'),
        freeTotal: this.findTotal(results, 'free'),
        slipTotal: this.findTotal(results, 'slip')
      }
    })
  }

  findTotal (results, type) {
    const result = results.find(result => result.type === type)

    if (result === undefined) return 0.0

    return result['amount']
  }
}
