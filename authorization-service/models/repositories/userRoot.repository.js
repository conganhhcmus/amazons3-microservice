const RootUserModel = require("../userRoot.model");

const RootUserRepository = {
  insertUser: (user) => {
    return RootUserModel.create(user);
  },

  findByIdAndInsertIAMUser: (id, iamUser) => {
    return RootUserModel.findOneAndUpdate(
      { _id: id },
      { $push: { iamUsers: iamUser } }
    );
  },
  updateLastLogged(id) {
    return RootUserModel.findOneAndUpdate(
      { _id: id },
      { lastLogged: new Date().toLocaleString() }
    );
  },
};

module.exports = RootUserRepository;
