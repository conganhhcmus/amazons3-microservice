const RootUserModel = require("../userRoot.model");

const RootUserFactory = {
    insertUser: (user) => {
        return RootUserModel.create(user);
    },

    findByIdAndInsertIAMUser: (id, iamUser) => {
        return RootUserModel.findOneAndUpdate(
            { _id: id },
            { $push: { iamUsers: iamUser } }
        );
    },
};

module.exports = RootUserFactory;
