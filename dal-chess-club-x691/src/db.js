const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'euro.cs.dal.ca',
  user: 'chessclub',
  password: 'Mee5shaong9kaiw4',
  database: 'chessclub'
});

module.exports = pool;
