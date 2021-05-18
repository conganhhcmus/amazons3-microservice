process.env.NODE_ENV = 'test';
const bcrypt = require("bcryptjs");

const connectDB = require("../utils/db");
const authService = require("../services/auth.service");
const RootUserModel = require("../models/userRoot.model");
const rootUserFactory = require("../models/factories/userRoot.factory");

var expect = require("chai").expect;

describe('Unit Test for Root User', function() {
    RootUserModel.collection.drop();
    var newUser = {
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
    };
    RootUserModel.create(newUser);

    describe('Unit Test for funcion loginRoot', function() {

        it('test funcion findByUsername', async function(){
            const user = await rootUserFactory.findByUsername('admin');
            expect(user.username).to.equal('admin');
            expect(bcrypt.compareSync('admin' ,user.password)).to.equal(true);
        });
    
        it('test funcion findById', async function(){
            const uservaild = await rootUserFactory.findByUsername('admin');
            const user = await rootUserFactory.findById(uservaild._id);
            expect(user).to.eql(uservaild);
        });
    
        it('test funcion loginRoot true', async function(){
            const user = await authService.loginRoot({ username: 'admin', password: 'admin'});
            expect(user).to.have.property('accessToken');
        });

        it('test funcion loginRoot false username', async function(){
            const user = await authService.loginRoot({ username: 'admin123', password: 'admin'});
            expect(user.errorCode).to.eql('login_fail_username');
        });

        it('test funcion loginRoot false password', async function(){
            const user = await authService.loginRoot({ username: 'admin', password: 'admin123'});
            expect(user.errorCode).to.eql('login_fail_password');
        });
    
    })
})