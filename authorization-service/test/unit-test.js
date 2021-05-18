process.env.NODE_ENV = 'test';
const bcrypt = require("bcryptjs");

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index')

const connectDB = require("../utils/db");
const authService = require("../services/auth.service");

const RootUserModel = require("../models/userRoot.model");
const rootUserFactory = require("../models/factories/userRoot.factory");

const should = chai.should();
chai.use(chaiHttp);

describe('Unit Test for Root User', function() {
    RootUserModel.collection.drop();
    beforeEach(function(done){
        var newUser = {
            username: 'admin',
            password: bcrypt.hashSync('admin', 10),
        };

        RootUserModel.create(newUser);
        done();
    });

    afterEach(function(done){
        RootUserModel.collection.drop();
        done();
    });
})