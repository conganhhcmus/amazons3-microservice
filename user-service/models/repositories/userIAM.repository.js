const IAMUserModel = require("../userIAM.model");

const IAMUserFactory = {
    insertUser: (user) => {
        return IAMUserModel.create(user);
    },

    findAllByRootId: (rootId) => {
        return IAMUserModel.find({owner: rootId}).exec();;
    }
};

module.exports = IAMUserFactory;
