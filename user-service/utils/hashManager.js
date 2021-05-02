const bcrypt = require("bcryptjs");

const hashingManager = {};

const generateHashPassword = (passwordString) => {
    const salt = 10;
    return bcrypt.hashSync(passwordString, salt);
};

const checkValidPassword = (rawPassword, hashPassword) => {
    return bcrypt.compareSync(rawPassword, hashPassword);
};

hashingManager.generateHashPassword = generateHashPassword;
hashingManager.checkValidPassword = checkValidPassword;

module.exports = hashingManager;
