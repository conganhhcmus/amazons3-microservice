const jwt = require("jsonwebtoken");

const tokenManager = {};

const generateAccessToken = (info) => {
    return jwt.sign(info, process.env.JWT_SECRET_KEY, {
        expiresIn: 3600,
    });
};

tokenManager.generateAccessToken = generateAccessToken;

module.exports = tokenManager;
