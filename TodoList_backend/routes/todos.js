const express = require('express');
const router = express.Router();
const connection = require('../db/config');
const authHeader = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

//get all todos
router.get('/', authMiddleware, (req, res) => {
    const query = 'SELECT * FROM todos';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        //return the list of todos
        res.json(results);
    });
});

//create a new todo item
router.post('/todos', authMiddleware, (req, res) => {
    const query = 'INSERT INTO todos (title) VALUES (?)';
    const { title } = req.body;

    connection.query(query, [title], (err,results) => {
        if(err){
            return res.status(404).json({ error: 'Can not insert to database'})
        }
        //return the created todo with its new id
        res.json({id: results.insertId, title });
    });
});

// Delete a todo item by id
router.delete('/todos/:id', authMiddleware,(req, res) => {
    const query ='DELETE FROM todos WHERE id = ?';
    const { id } = req.params;
    connection.query(query, [id], (err, results) => {
        if(err){
            return res.status(404).json({ error: 'Can not delete todo items'})
        }
        //return success message and how many rows were affected
        res.json({ message: 'Todo deleted successfully', affectedRows: results.affectedRows });
    });
});

//uppdate a todo item
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
    connection.query(query, [title, completed, id], (err, results) => {
        if(err) {
            return res.status(404).json({ error: "Can not update this todo item"})
        }
        res.json(results);
    });
};

router.put('/todos/:id', authMiddleware, updateTodo);
router.patch('/todos/:id', authMiddleware, updateTodo);

module.exports = router;
