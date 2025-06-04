const todoService = require('../service/todoService');

const getTodos = async (req, res) => {
    try {
        const todos = await todoService.getTodos(req.user);
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.userId;
        const todo = await todoService.createTodo(title, userId);
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error'});
    }
};

const updateTodo = async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const { title, completed } = req.body;
        const result = await todoService.updateTodo(id, title, completed, userId);
        res.json(result);
    } catch (err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error'})
    }
};

const deleteTodo = async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const result = await todoService.deleteTodo(id, userId);
        res.json(result);
    } catch(err){
        console.error(err);
        res.status(500).json({ message:'Internal server error'})
    } 
};
module.exports = {
    getTodos, 
    createTodo,
    updateTodo,
    deleteTodo
};
