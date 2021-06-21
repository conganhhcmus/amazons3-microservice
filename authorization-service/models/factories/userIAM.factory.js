const IAMUserModel = require("../userIAM.model");

const IAMUserFactory = {
  findByUsername: (username) => {
    return IAMUserModel.findOne({ username });
  },
  findByUsernameAndOwnerId: (username, ownerId) => {
    return IAMUserModel.findOne({ username, owner: ownerId }).populate({
      path: "owner",
      model: "RootUser",
    });
  },
};

module.exports = IAMUserFactory;
