const jwt = require("jsonwebtoken");
const {jwtKey} = require("../configs/JWT.config");

const tokenManager = {};

const generateAccessToken = (info) => {
    return jwt.sign(info, jwtKey, {
        expiresIn: 3600,
    });
};

tokenManager.generateAccessToken = generateAccessToken;

module.exports = tokenManager;
