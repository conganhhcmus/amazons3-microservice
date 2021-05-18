process.env.NODE_ENV = 'test';
const bcrypt = require("bcryptjs");

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index')
const should = chai.should();

const RootUserModel = require("../models/userRoot.model");

chai.use(chaiHttp);

describe('Test Authorzition Serveice', function () {
    RootUserModel.collection.drop();
    var newUser = {
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
    };

    RootUserModel.create(newUser);

    it('check server start on / GET', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res){
                    done();
            });
    });

    it('login Root user true on /api/v1/auth/login-root POST' ,function (done) {
        chai.request(server)
            .post('/api/v1/auth/login-root')
            .send({'username': 'admin', 'password': 'admin'})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('accessToken');
                done();
            });
    });

    it('login Root user false password on /api/v1/auth/login-root POST' ,function (done) {
        chai.request(server)
            .post('/api/v1/auth/login-root')
            .send({'username': 'admin', 'password': 'admin1'})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errorCode');
                res.body.errorCode.should.equal('login_fail_password');
                done();
            });
    });

    it('login Root user false username on /api/v1/auth/login-root POST' ,function (done) {
        chai.request(server)
            .post('/api/v1/auth/login-root')
            .send({'username': 'admin1', 'password': 'admin'})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errorCode');
                res.body.errorCode.should.equal('login_fail_username');
                done();
            });
    });


})