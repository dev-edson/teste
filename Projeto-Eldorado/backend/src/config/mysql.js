const mysql = require('mysql2/promise')

const conexao = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'fullstack',
        database: 'dbcar',
        port: 3306
    })

    connection.config.namedPlaceholders = true

    return connection
}

module.exports = conexao