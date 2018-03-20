const types = ['EatingOUT', 'Fillum', 'Outsite', 'Vrijdagbar', 'Potterie', 'Overig']

export default class BarSessionType {
  static all () {
    return types.map((name, id) => new BarSessionType(id, name))
  }

  static getById (id) {
    return new BarSessionType(id, types[id])
  }

  constructor (id, name) {
    this.id = id
    this.name = name
  }
}
