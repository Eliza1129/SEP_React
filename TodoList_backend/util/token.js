const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// access token
const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "10m",
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const refreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: "7d",
    });
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
};

const safeVerifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = {
    signToken,
    refreshToken,
    verifyToken,
    verifyRefreshToken,
    safeVerifyToken,
};
