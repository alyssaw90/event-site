'use strict';

// require('dotenv').load();
// let User = require('../models/User');
const bodyparser = require('body-parser');
// const cookieParser = require('cookie-parser');
const clc = require('cli-color');
const session = require('express-session');
const models = require('../models');
const userLogging = require(`../scripts/userLogging`)();
const isLoggedIn = userLogging.isLoggedIn;
const isLoggedInAdmin = userLogging.isLoggedInAdmin;
const User = models.User;
const Speaker = models.Speaker;
const Event = models.Event;
const EventTab = models.EventTab;
const MsUser = models.MsUser;

function makeRandomString() {
    let outputString = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
    let randomNumber = Math.ceil(Math.random() * 10) + 10;
    for (let i = 0; i < randomNumber; i++) {
        outputString += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return outputString;
}

models.sql.authenticate()
    .then(function(err) {
        if (err) {
            console.log(clc.xterm(46)('Unable to connect to the database with auth router: '), err);
        } else {
            console.log(clc.xterm(46)('Connection has been established successfully with auth router.'));
        }
    });

module.exports = function(router, passport) {
    router.use(bodyparser.json());
    router.use(bodyparser.urlencoded({
        extended: true
    }));

};
