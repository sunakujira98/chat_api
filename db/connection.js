const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'steven',
  password: 'Gelembung1223!',
  database: 'db_message'
})

module.exports = con