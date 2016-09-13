'use strict';

const Basic = require('passport-http').BasicStrategy;
const Digest = require('passport-http').DigestStrategy;
const models = require('../models');
const User = models.User;
const clc = require('cli-color');

// This route works!!!!!!
module.exports = (passport) => {
  passport.use('basic', new Basic({}, (userName, password, done) => {
    // var userInfo = userName + password + '}';
    
    User.findOne({
      where: {
        $or: [
          {
            email: userName
          },
          {
            userName: userName
          }
        ]
      }
    })
    .then( (user) => {
      let verified = false;
      if (user) {
        verified = user.$modelOptions.instanceMethods.verifyPassword(password, user.dataValues.password);
      }
      if (!user) {
        done('no such user');
      }
      if (user && !verified) {
        done('wrong password');
      }
      if (user && verified) {
        done(null, user);
      }
    })
    .error( (err) => {
      console.log(err);
      res.status(500).json({msg: 'there was a problem logging in to your account'});
      done(err);
    })
  }));
}
