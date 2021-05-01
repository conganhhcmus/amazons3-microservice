const IAMUserModel = require("../userIAM.model");

const IAMUserFactory = {
    insertUser: (user) => {
        return IAMUserModel.create(user);
    },
};

module.exports = IAMUserFactory;
