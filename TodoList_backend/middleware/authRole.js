function authRole(requiredRole) {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
        next();
    };
}

module.exports = authRole;
