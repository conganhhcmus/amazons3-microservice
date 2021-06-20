const rootUserFactory = require("../models/factories/userRoot.factory");
const iamUserFactory = require("../models/factories/userIAM.factory");
const hashingManager = require("../utils/hashManager");
const tokenManager = require("../utils/tokenManager");
const PERMISSION = require("../constants/permission");
const { authResponses } = require("../utils/responses");
const IAMUserRepository = require("../models/repositories/userIAM.repository");
const RootUserRepository = require("../models/repositories/userRoot.repository");

const userService = {
  loginRoot,
  loginIAM,
};

async function loginRoot(user) {
  // validate user

  const { username, password } = user;

  let isUsernameExist = await checkUsernameRootExist(username);
  if (!isUsernameExist) {
    return authResponses.loginNotExistUsername();
  }

  const userDocument = await rootUserFactory.findByUsername(username);
  //console.log(userDocument.password);
  const isValidatePassword = hashingManager.checkValidPassword(
    password,
    userDocument.password
  );
  if (!isValidatePassword) {
    return authResponses.loginNotCorrectPassword();
  }
  // console.log(userDocument.username)
  var token = tokenManager.generateAccessToken({
    userId: userDocument._id,
    userName: userDocument.username,
    permission: PERMISSION.FULL_ACCESS,
  });

  await RootUserRepository.updateLastLogged(userDocument._id);
  return authResponses.loginSuccess(token, userDocument);
}

async function loginIAM(user) {
  // validate user

  const { username, password, rootUsername } = user;

  let rootUserDocument = await rootUserFactory.findByUsername(rootUsername);
  if (rootUserDocument === null) {
    return authResponses.loginNotCorrectOwner();
  }
  let isUsernameExist = await checkIAMUsernameExist(
    username,
    rootUserDocument.id
  );
  if (!isUsernameExist) {
    return authResponses.loginNotExistUsername();
  }

  const userDocument = await iamUserFactory.findByUsernameAndOwnerId(
    username,
    rootUserDocument._id
  );

  const isValidPassword = hashingManager.checkValidPassword(
    password,
    userDocument.password
  );
  if (!isValidPassword) {
    return authResponses.loginNotCorrectPassword();
  }

  var token = tokenManager.generateAccessToken({
    userId: userDocument._id,
    permission: userDocument.permission,
  });
  await IAMUserRepository.updateLastLogged(userDocument._id);
  return authResponses.loginSuccess(token, userDocument);
}

async function checkUsernameRootExist(username) {
  let result = false;

  const userDocument = await rootUserFactory.findByUsername(username);
  if (userDocument) {
    result = true;
  }

  return result;
}

async function checkIAMUsernameExist(username, rootId) {
  let result = false;

  const userDocument = await iamUserFactory.findByUsernameAndOwnerId(
    username,
    rootId
  );
  if (userDocument) {
    result = true;
  }

  return result;
}

module.exports = userService;
