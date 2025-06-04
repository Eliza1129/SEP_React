const express = require('express');
const router = express.Router();
const connection = require('../db/config');
const authMiddleware = require('../middleware/authMiddleware');
const authRole = require('../middleware/authRole');
const todoController = require('../controllers/todoControllers')


//get todo based on different role
router.get('/', authMiddleware, todoController.getTodos);

//create a new todo item
router.post('/', authMiddleware, todoController.createTodo);

//uppdate a todo item
router.put('/:id', authMiddleware, todoController.updateTodo);
router.patch('/:id', authMiddleware, todoController.updateTodo);

// Delete a todo item by id
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
