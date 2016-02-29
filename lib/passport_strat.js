'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');
var clc = require('cli-color');

// module.exports = function(passport) {
// 	passport.use('basic', new Basic({}, function(email, password, done) {
// 		User.findOne({where: {email: email}})
// 		.then(function(err, user) {
// 			// var verified = user.$modelOptions.instanceMethods.verifyPassword(password, user.dataValues.password);
// 			console.log(clc.greenBright('verified ::::   '), user);
// 			if (err) {
// 				return done(err);
// 			}
// 			if (!user) {
// 				return done(null, false, {msg: 'no such user'});
// 			}
// 			if(!user.$modelOptions.instanceMethods.verifyPassword(password, user.dataValues.password)) {
// 				return done(null, false, {msg: 'incorrect password'});
// 			}
// 			if (user.$modelOptions.instanceMethods.verifyPassword(password, user.dataValues.password)) {
// 				// console.log(clc.blueBright('password matched'));
// 				return done(null, user);
// 			}
// 		})
// 		/*.error(function(err) {
// 			console.log(err);
// 			res.status(500).json({msg: 'there was a problem logging in to your account'});
// 		})*/
// 	}));
// }


module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    User.findOne({where: {email: email}})
      .then(function(user) {
      	if (user) {
      		var verified = user.$modelOptions.instanceMethods.verifyPassword(password, user.dataValues.password);
      	}
        // console.log(clc.greenBright('Done Callback ::::   '), done);
        if (!user) {
          done('no such user');
        }
        if (user && !verified) {
          done('wrong password');
        }
        if (user && verified) {
          // console.log(clc.blueBright('password matched'));
          done(null, user);
        }
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({msg: 'there was a problem logging in to your account'});
        done(err);
      })
  }));
}