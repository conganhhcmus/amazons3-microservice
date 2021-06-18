const ERROR_CODE = require("../constants/error-code");

const authResponses = {
  loginNotExistUsername() {
    return {
      statusCode: 200,
      msg: "Username is not exist",
      errorCode: ERROR_CODE.LOGIN_FAIL_USERNAME,
    };
  },
  loginNotCorrectRole() {
    return {
      statusCode: 200,
      msg: "Quyền đăng nhập tài khoản không hợp lệ.",
      errorCode: ERROR_CODE.LOGIN_FAIL_ROLE,
    };
  },
  loginNotCorrectPassword() {
    return {
      statusCode: 200,
      msg: "Mật khẩu không đúng",
      errorCode: ERROR_CODE.LOGIN_FAIL_PASSWORD,
    };
  },
  loginNotCorrectOwner() {
    return {
      statusCode: 200,
      msg: "Root user is not correct",
      errorCode: ERROR_CODE.LOGIN_FAIL_OWNER,
    };
  },
  loginSuccess(token, user) {
    return {
      statusCode: 200,
      accessToken: token,
      user,
    };
  },
};

module.exports = {
  authResponses,
};
