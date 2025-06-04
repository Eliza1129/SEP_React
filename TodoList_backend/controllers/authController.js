const authService = require('../service/authService');

const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const token = await authService.registerUser(username, password, role);
        res.json({ 
          message: 'User registered successfully', 
          token 
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.loginUser(username, password);
        res.json({ 
          message: 'Login successful', 
          token 
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    register,
    login
};
