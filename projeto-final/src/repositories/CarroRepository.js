const Carro = require('../models/Carro')

class CarroRepository {
    constructor() {
        this._carros = []
    }
    //save() {}
    salvarCarro(carro) {
        if (carro instanceof Carro) {
            this._carros.push(carro)
        }
    }

    //selectAll() {}
    listarCarros() {
        return [...this._carros]
    }

    filter() { }
    filtrarCarrosPorAno(ano) {
        this._carros.filter(carro => carro.getAno() === ano)
    }

    //delete() {}    
    removerCarro(modelo) {
        this._carros = this._carros.filter(carro => carro.getModelo() !== modelo)
    }

    //update() {}
    editarCarro(novoCarro) {
        this._carros = this._carros.map(carro => {
            if (carro.getModelo() === novoCarro.getModelo()) {
                return novoCarro
            } else {
                return carro
            }
        })
    }
}

module.exports = CarroRepository