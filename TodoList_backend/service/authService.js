const bcrypt = require('bcrypt');
const { signToken } = require('../util/token');
const authRepository = require('../repositories/authRepository');

const registerUser = async (username, password, role = 'user') => {
    const existingUser = await authRepository.findUserByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authRepository.createUser(username, hashedPassword, role);
    const token = signToken({ 
      userId: user.id, 
      username: user.username, 
      role: user.role });
    return token;
};

const loginUser = async (username, password) => {
    const user = await authRepository.findUserByUsername(username);
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const token = signToken({ 
      userId: user.id, 
      username: user.username, 
      role: user.role 
    });
    
    return token;
};

module.exports = {
    registerUser,
    loginUser
};
