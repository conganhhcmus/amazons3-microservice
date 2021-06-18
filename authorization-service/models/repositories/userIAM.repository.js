const IAMUserModel = require("../userIAM.model");

const IAMUserRepository = {
  insertUser: (user) => {
    return IAMUserModel.create(user);
  },
  updateLastLogged(id) {
    return IAMUserModel.findOneAndUpdate(
      { _id: id },
      { lastLogged: new Date().toLocaleString() }
    );
  },
};

module.exports = IAMUserRepository;
