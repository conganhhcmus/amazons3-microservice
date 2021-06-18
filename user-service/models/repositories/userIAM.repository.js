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

    findByIdAndUpdate: (id, user) => {
        return IAMUserModel.findOneAndUpdate(
            { _id: id },
            { $set: { 
                permission: user.permission,
                password: user.newpassword 
                }
            }
        );
    },

    findByIdAndDelete: (id) => {
        return IAMUserModel.findByIdAndRemove(id).exec();
    },
};

module.exports = IAMUserFactory;
