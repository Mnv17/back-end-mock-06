require("dotenv").config()
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: 'Authentication failed', message: "Login First" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken)
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = { requireAuth }