const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith('Bearer')){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err){
                return res.status(401).json({ mesaage: 'Unauthorized'});
            }
            req.user = decoded;
            next();
        });
    } else {
            return res.status(401).json({ message: 'Unauthorized'});
    }
}


module.exports = authMiddleware;