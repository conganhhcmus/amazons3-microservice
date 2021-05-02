const RootUserModel = require("../userRoot.model");

const RootUserFactory = {
    findByUsername: (username) => {
        return RootUserModel.findOne({ username });
    },
    findById: (id) => {
        return RootUserModel.findById({ _id: id });
    },
};

module.exports = RootUserFactory;
