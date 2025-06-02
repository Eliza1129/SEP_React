const express = require('express');
const router = express.Router();
const connection = require('../db/config');
const authMiddleware = require('../middleware/authMiddleware');
const authRole = require('../middleware/authRole');


//get todo based on different role
router.get('/', authMiddleware, (req,res) => {
    const userId = req.user.userId;
    const role = req.user.role;

    let query;
    let params= [];

    if (role === 'admin') {
        query = 'SELECT * FROM todos';
    } else {
        query = 'SELECT * FROM todos WHERE userId = ?';
        params = [userId];
    }

    connection.query(query, [userId], (err, results) => {
        if(err){
            return res.status(500).json({ error: 'Databse error'})
        }
        res.json(results);
    });
});

//admin only
router.get('/admin-only', authMiddleware, authRole('admin'), (req, res) => {
    res.json({ message: 'Hello admin!' });
});

//create a new todo item
router.post('/', authMiddleware, (req, res) => {
    const query = 'INSERT INTO todos (title, userId) VALUES (?)';
    const { title } = req.body;
    const userId = req.user.userId;

    connection.query(query, [title, userId], (err,results) => {
        if(err){
            return res.status(404).json({ error: 'Can not insert to database'})
        }
        //return the created todo with its new id
        res.json({id: results.insertId, title });
    });
});

// Delete a todo item by id
router.delete('/:id', authMiddleware,(req, res) => {
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
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, completed } = req.body;
    const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ? AND userId = ?';
    connection.query(query, [title, completed, id, userId], (err, results) => {
        if(err) {
            return res.status(404).json({ error: "Can not update this todo item"})
        }
        res.json(results);
    });
};

router.put('/:id', authMiddleware, updateTodo);
router.patch('/:id', authMiddleware, updateTodo);

module.exports = router;
