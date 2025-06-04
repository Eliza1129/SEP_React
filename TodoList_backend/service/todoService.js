const { use } = require('react');
const todoRepository = require('../repositories/todoRepository');

const getTodos = async (user) => {
    if (user.role === 'admin') {
        return await todoRepository.getAllTodos();
    } else {
        return await todoRepository.getTodosByUserId(user.userId);
    }
};

const createTodo = async (title, userId) => {
    return await todoRepository.createTodo(title, userId);
}

const updateTodo = async(id,title, completed, userId) => {
    return await todoRepository.updateTodo(id, title, completed, userId);
}
const deleteTodo = async (id, userId) => {
    return await todoRepository.deleteTodo(id, userId);
}
module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
