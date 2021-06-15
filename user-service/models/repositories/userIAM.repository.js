const IAMUserModel = require("../userIAM.model");

const IAMUserFactory = {
    insertUser: (user) => {
        return IAMUserModel.create(user);
    },
    findByIdAndUpdatePermission: (id, permission) => {
        return IAMUserModel.findOneAndUpdate(
            { _id: id },
            { $set: { permission: permission }}
        );
    },
};

module.exports = IAMUserFactory;
