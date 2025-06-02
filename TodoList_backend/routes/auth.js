const { Router } = require("express");
const jwt = require('jsonwebtoken');
const { signToken } = require("../util/token");
const router = Router();
const connection = require('../db/config');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    
    try {

        //check username
        const checkQuery = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await connection.promise().query(checkQuery, [username]);

        if (rows.length > 0) {
            return res.status(409).json({ message: 'Username already exists'});
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insert user
        const insertQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?)';
        const [results] = await connection.promise().query(insertQuery, [username, hashedPassword, role || 'user'])
        
        // Generate Token
        const token = signToken( { userId: results.insertId, username, role: role || 'user'});

        // respond with token
        res.json({ message: 'User registered successfully', token});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }   
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {

        const LoginQuery = 'SELECT * FROM users WHERE username = ?';
        const [users] = await connection.promise().query(LoginQuery, [username]);
        
        if(users.length === 0){
                return res.status(401).json({message: "User not found"})
            }
        const [user] = users;
        
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid password'})
        }

        //generate token
        const token = signToken({ userId: user.id, username: user.username, role: user.role});
        res.json({ message: 'Login successful', token});
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error'});
    }
});

module.exports = router;