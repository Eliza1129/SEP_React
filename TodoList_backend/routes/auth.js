const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({ message: 'Error hashing password'});
        }
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(query, [username, hash], (err, results) => {
            if(err){
                return res.status(500).json({ message: 'Error inserting user' });
            }
            res.json({ message: 'User registered successfully' });
        });
    });
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username],(err, results) => {
            if(err) {
                return res.status(500).json({message: "Database error"});
        }
            if(results.length === 0){
                return res.status(404).json({message: " User not found"})
            }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err){
                return res.status(500).json({ message:'Error comparing passwords'})
            }
            if(isMatch){
                const token = jwt.sign(
                    { id: user.id, username: user.username },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({ token });
            } else {
                return res.status(401).json({ message: 'Invalid password'})
            }
        });
    });
    
});

module.exports = router;