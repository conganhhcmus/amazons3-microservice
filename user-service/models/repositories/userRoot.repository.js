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

    findByIdAndDeleteIAM: (id, iamUser) => {
        return RootUserModel.findOneAndUpdate(
            { _id: id },
            { $pull: { iamUsers: iamUser } }
        );
    },
};

module.exports = RootUserFactory;
