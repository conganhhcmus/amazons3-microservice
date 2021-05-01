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
};

module.exports = {
    userServiceResponses,
};
