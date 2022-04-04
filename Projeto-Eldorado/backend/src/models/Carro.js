class Carro {
  constructor(category, partnumber, cor, id = null) {
    this._id = id
    this._category = category
    this._partnumber = partnumber
    this._cor = (cor !== '' && cor !== null && cor !== undefined) ? cor : 'Indefinida'
  }

  getId() {
    return this._id
  }

  setId(id) {
    this._id = id
  }

  getCategory() {
    return this._category
  }

  setCategory(category) {
    this._category = category
  }

  getPartnumber() {
    return this._partnumber
  }

  setPartnumber(partnumber) {
    this._partnumber = partnumber
  }

  getCor() {
    return this._cor
  }

  setCor(cor) {
    this._cor = (cor !== '' && cor !== null && cor !== undefined) ? cor : 'Indefinida'
  }
}

module.exports = Carro