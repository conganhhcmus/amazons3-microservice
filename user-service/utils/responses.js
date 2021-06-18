const ERROR_CODE = require("../constants/error-code");

const userServiceResponses = {
  registerSuccess(user) {
    return {
      statusCode: 201,
      user: user,
    };
  },
  registerAlreadyUsername() {
    return {
      statusCode: 200,
      msg: "Username is already exist",
      error: ERROR_CODE.REGISTER_ALREADY_USERNAME,
    };
  },
  getSuccess(user) {
    return {
      statusCode: 200,
      user,
    };
  },
  getUsersSuccess(users) {
    return {
      statusCode: 200,
      users,
    };
  },
  updateSuccess(user) {
    return {
      statusCode: 201,
      user: user,
    };
  },

  updateFail() {
    return {
      statusCode: 200,
      msg: "Update fail",
      error: ERROR_CODE.UPDATE_FAIL,
    };
  },

  deleteSuccess() {
    return {
      statusCode: 200,
      error: ERROR_CODE.DELETE_SUCCESS,
    };
  },
  getByTokensFail() {
    return {
      statusCode: 200,
      error: ERROR_CODE.TOKENS_INVALID,
    };
  },
  getByIdFail() {
    return {
      statusCode: 200,
      error: ERROR_CODE.ID_INVALID,
    };
  },
};

module.exports = {
  userServiceResponses,
};
