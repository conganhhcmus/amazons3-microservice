const IAMUserModel = require("../userIAM.model");

const IAMUserFactory = {
  findByUsername: (username) => {
    return IAMUserModel.findOne({ username });
  },
  findByUsernameAndOwnerId: (username, ownerId) => {
    return IAMUserModel.findOne({ username, owner: ownerId });
  },
  findById: (id) => {
    return IAMUserModel.findById({ _id: id });
  },
  findAllByRootId: (rootId) => {
    return IAMUserModel.find({ owner: rootId }).exec();
  },
  findByTokens: (publicToken, privateToken) => {
    return IAMUserModel.findOne({ publicToken, privateToken }).exec();
  },
};

module.exports = IAMUserFactory;
