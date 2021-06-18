const RootUserModel = require("../userRoot.model");

const RootUserFactory = {
  findByUsername: (username) => {
    return RootUserModel.findOne({ username });
  },
  findById: (id) => {
    return RootUserModel.findById({ _id: id });
  },
  findByTokens: (publicToken, privateToken) => {
    return RootUserModel.findOne({ publicToken, privateToken }).exec();
  },
};

module.exports = RootUserFactory;
