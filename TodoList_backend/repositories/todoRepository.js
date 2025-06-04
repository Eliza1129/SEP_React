const connection = require('../db/config');

const getAllTodos = async () => {
    const [rows] = await connection.promise().query('SELECT * FROM todos');
    return rows;
};

const getTodosByUserId = async (userId) => {
    const [rows] = await connection.promise().query('SELECT * FROM todos WHERE userId = ?', [userId]);
    return rows;
};

const createTodo = async (title,userId) => {
    const query = 'INSERT INTO todos (title, userId) VALUES (?, ?)';
    const[result] = await connection.promise().query(query, [title, userId]);
    return {id: result.insertId, title, userId };
}

const updateTodo = async (id, title, completed, userId ) => {
	const query = 'UPDATE todos STE title = ?, completed = ?, WHERE id = ?';
	const [result] = await connection.promise().query(query, [title, completed, id, userId]);
	return result;
}

const deleteTodo = async (id, userId) => {
	const query = 'DELETE FROM todos WHERE id = ? AND userId =?';
	const [result] = await connection.promise().query(query, [id, userId]);
	return result;
}
module.exports = {
    getAllTodos,
    getTodosByUserId,
		createTodo,
		updateTodo,
		deleteTodo
};
