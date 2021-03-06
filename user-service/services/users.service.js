var srs = require("secure-random-string");

const rootUserFactory = require("../models/factories/userRoot.factory");
const iamUserFactory = require("../models/factories/userIAM.factory");
const rootUserRepository = require("../models/repositories/userRoot.repository");
const iamUserRepository = require("../models/repositories/userIAM.repository");
const { userServiceResponses } = require("../utils/responses");
const hashingManager = require("../utils/hashManager");

const userService = {
  registerRoot,
  registerIAM,
  getIAM,
  updateUserIAM,
  deleteIAM,
  getUserByKeys,
  getUserById,
};

async function registerRoot(user) {
  // validate user client sent: username, password

  let isUsernameExist = await checkUsernameRootExist(user.username);
  if (isUsernameExist) {
    return userServiceResponses.registerAlreadyUsername();
  }

  user.publicToken = srs();
  user.privateToken = srs();

  const hashedPassword = hashingManager.generateHashPassword(user.password);
  user.password = hashedPassword;

  await rootUserRepository.insertUser(user);
  delete user.password;

  return userServiceResponses.registerSuccess(user);
}

async function registerIAM(newUserIAM, userRootId) {
  // validate user client sent: username, password, permission

  let isUsernameExist = await checkIAMUsernameExist(
    newUserIAM.username,
    userRootId
  );
  if (isUsernameExist) {
    return userServiceResponses.registerAlreadyUsername();
  }

  const hashedPassword = hashingManager.generateHashPassword(
    newUserIAM.password
  );
  newUserIAM.password = hashedPassword;

  newUserIAM.publicToken = srs();
  newUserIAM.privateToken = srs();

  let rootUser = await rootUserFactory.findById(userRootId);
  newUserIAM.owner = rootUser;

  let iamUserDocument = await iamUserRepository.insertUser(newUserIAM);
  delete newUserIAM.password;

  await rootUserRepository.findByIdAndInsertIAMUser(
    userRootId,
    iamUserDocument
  );

  return userServiceResponses.registerSuccess(newUserIAM);
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

async function getIAM(userRootId) {
  const IAMUser = await iamUserFactory.findAllByRootId(userRootId);

  return userServiceResponses.getUsersSuccess(IAMUser);
}

async function updateUserIAM(newUser) {
  if (
    newUser.permission < -1 ||
    (newUser.permission > 1 && newUser.permission !== 99)
  ) {
    return userServiceResponses.updateFail();
  }

  if (newUser.password) {
    newUser.newpassword = hashingManager.generateHashPassword(newUser.password);
    await iamUserRepository.findByIdAndUpdate(newUser.id, newUser);
  } else {
    await iamUserRepository.findByIdAndUpdatePermission(
      newUser.id,
      newUser.permission
    );
  }

  const newIAMUser = await iamUserFactory.findById(newUser.id);

  return userServiceResponses.updateSuccess(newIAMUser);
}

async function deleteIAM(userRootId, iamId) {
  await iamUserRepository.findByIdAndDelete(iamId);
  await rootUserRepository.findByIdAndDeleteIAM(userRootId, iamId);
  return userServiceResponses.deleteSuccess();
}

async function getUserByKeys({ publicToken, privateToken }) {
  const user = await findUserByTokens(publicToken, privateToken);
  if (!user) {
    return userServiceResponses.getByTokensFail();
  }
  return userServiceResponses.getSuccess(user);
}

async function getUserById(idUser) {
  const user = await findUserById(idUser);
  if (!user) {
    return userServiceResponses.getByIdFail();
  }
  return userServiceResponses.getSuccess(user);
}

async function findUserByTokens(publicToken, privateToken) {
  let user = null;
  user = await iamUserFactory.findByTokens(publicToken, privateToken);
  if (!user) {
    user = await rootUserFactory.findByTokens(publicToken, privateToken);
  }
  if (!user) {
    user = null;
  }
  return user;
}
async function findUserById(idUser) {
  let user = null;
  user = await iamUserFactory.findById(idUser);
  if (!user) {
    user = await rootUserFactory.findById(idUser);
  }
  if (!user) {
    user = null;
  }
  return user;
}

module.exports = userService;
