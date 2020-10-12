const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'db',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'amazon'
});

module.exports = connection;
