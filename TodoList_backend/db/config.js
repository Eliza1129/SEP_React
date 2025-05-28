const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    socketPath: '/tmp/mysql.sock',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'todo_app',
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

module.exports = connection;
