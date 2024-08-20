const jwt = require('jsonwebtoken');
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const employeeService = require("../services/employeeService");

const generateToken = async (user) => {
    
    token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

    return `Bearer ${token}`;
};

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    if (token.startsWith("Bearer ")) {
        token = token.substring(7, token.length);
    } else {
        return res.status(400).json({ message: "Enter a valid token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token.", error });
    }
};

module.exports = {
    generateToken,
    verifyToken
};