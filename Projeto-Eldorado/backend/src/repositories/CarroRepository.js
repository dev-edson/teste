const { tratarErro } = require('../utils/logUtils')

const Carro = require('../models/Carro')
const conexao = require('../config/mysql')

class CarroRepository {
  _criarTabela() {
    const criacaoTabelaSql = `
      CREATE TABLE IF NOT EXISTS Carros (
        Carro_id INT AUTO_INCREMENT PRIMARY KEY,
          Category_id INT,
          carro_Color VARCHAR(16) NOT NULL,
          carro_PartNumber INT NOT NULL,
          CONSTRAINT fk_category FOREIGN KEY (category_id)
          REFERENCES category(category_id)
      )
      
    `
    this._bancoDeDados.query(criacaoTabelaSql, err => { tratarErro(err) })
  }

  async salvarCarro(carro) {
    let connection

    try {
      if (carro instanceof Carro) {
        const sql = 'INSERT INTO carros (category_id, carro_partnumber, carro_color) VALUES (:category, :partnumber, :cor)'

        const parametros = {
          category: carro.category(),
          partnumber: carro.partnumber(),
          cor: carro.getCor()
        }

        connection = await conexao()
        await connection.query(sql, parametros)
      }
    } catch (error) {
      console.log('Erro ao salvar um carro', error.message)
    } finally {
      connection.end()
    }
  }

  async listarCarros() {
    let connection

    try {
      const sql = 'SELECT * FROM carros'

      connection = await conexao()
      const [result] = await connection.query(sql)

      let carrosFormatados = []

      if (result.length > 0) {
        carrosFormatados = result.map(carro =>
          new Carro(
            carro.category_id,
            carro.carro_partnumber,
            carro.carro_color,
            carro.carro_id
          )
        )
      }

      return [...carrosFormatados]
    } catch (error) {
      console.log('Erro ao listar carros', error.message)
    } finally {
      connection.end()
    }
  }

  async filtrarCarros(filtro) {
    const { category, partnumber, cor } = filtro

    const filtros = []
    const filtrosValores = []

    if (category) {
      filtros.push('carro_category = ?')
      filtrosValores.push(category)
    }

    if (partnumber) {
      filtros.push('carro_partnumber = ?')
      filtrosValores.push(partnumber)
    }

    if (cor) {
      filtros.push('carro_cor = ?')
      filtrosValores.push(cor)
    }

    let connection

    try {
      let filtroSql = 'SELECT * FROM carros'

      if (filtros.length > 0) {
        filtroSql += ' WHERE ' + filtros.join(' AND ')
      }

      connection = await conexao()
      const result = await connection.query(filtroSql, filtrosValores)

      let carrosFormatados = []

      if (result.length > 0) {
        carrosFormatados = result.map(carro =>
          new Carro(
            carro.category_d,
            carro.carro_partnumber,
            carro.carro_color,
            carro.carro_id
          )
        )
      }

      return [...carrosFormatados]
    } catch (error) {
      console.log('Erro ao filtrar os carros', error.message)
    } finally {
      connection.end()
    }
  }

  async editarCarro(carro) {
    let connection

    try {
      const sql = `
        UPDATE carros SET
          category_id = :category, 
          carro_partnumber = :partnumber, 
          carro_color = :cor
        WHERE carro_id = :id
      `

      const parametros = {
        category: carro.getCategory(),
        partnumber: carro.getPartnumber(),
        cor: carro.getCor(),
        id: carro.getId()
      }

      connection = await conexao()
      await connection.query(sql, parametros)
    } catch (error) {
      console.log('Erro ao editar carro', error.message)
    } finally {
      connection.end()
    }
  }

  async removerCarro(idCarro) {
    let connection

    try {
      const sql = 'DELETE FROM carros WHERE carro_id = :idCarro'

      connection = await conexao()
      await connection.query(sql, { idCarro })
    } catch (error) {
      console.log('Erro ao remover carro', error.message)
    } finally {
      connection.end()
    }
  }
}

module.exports = CarroRepository