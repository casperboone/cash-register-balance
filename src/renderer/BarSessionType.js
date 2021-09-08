class BarSessionType {
  static all () {
    return types
  }

  static getDefaultForDate (date) {
    const type = types.find(type => type.dayOfTheWeek === date.getDay())

    if (type === undefined) {
      return types.find(type => type.dayOfTheWeek === -1)
    }

    return type
  }

  static getById (id) {
    return types.find(type => type.id === id)
  }

  constructor (id, name, dayOfTheWeek = -1) {
    this.id = id
    this.name = name
    this.dayOfTheWeek = dayOfTheWeek
  }
}

const types = [
  new BarSessionType(0, 'EatingOUT', 1),
  new BarSessionType(6, 'AEGEE', 2),
  new BarSessionType(1, 'Fillum', 3),
  new BarSessionType(2, 'Outsite', 4),
  new BarSessionType(3, 'MIXUP', 6),
  new BarSessionType(5, 'Other')
]

export default BarSessionType
