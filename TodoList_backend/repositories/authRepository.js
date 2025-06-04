const connection = require('../db/config');

const findUserByUserId = async (username) => {
  const [rows] = await connection.promise().query(
    'SELECT * FROM users WHERE username = ?',
    [username]);
  return rows[0];
};

const creatUser = async (username, hashedPassword, role) => {
  const insertQuery = 'INSERT INTO users (username, password, role) VALUE (?, ?, ?)';
  const [result] = await connection.promise().query(insertQuery, [username, hashedPassword, role]);
  return { 
    id: result.insertId, 
    username, 
    role 
  };
};

module.exports = {
  findUserByUserId,
  creatUser
};