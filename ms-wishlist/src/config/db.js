const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'beatriz18',
  database : 'amazondb'
});

module.exports = connection;
