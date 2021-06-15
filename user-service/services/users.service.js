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
};

async function registerRoot(user) {
    // validate user client sent: username, password

    let isUsernameExist = await checkUsernameRootExist(user.username);
    if (isUsernameExist) {
        return userServiceResponses.registerAlreadyUsername();
    }

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

    const publicToken = srs();
    const privateToken = srs();
    newUserIAM.iamTokens = {
        publicToken,
        privateToken,
    };

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
    const IAMUser = await iamUserRepository.findAllByRootId(userRootId);

    return userServiceResponses.getSuccess(IAMUser);
}

module.exports = userService;
