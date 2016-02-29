'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
	passport.use('basic', new Basic({}, function(email, password, done) {
		User.findOne({where: {email: email}})
		.then(function(user) {
			if (!user) {
				return done('no such user');
			}
			if(!user.$modelOptions.instanceMethods.verifyPassword(password, user.dataValues.password)) {
				return done('wrong password');
			}

			return done(null, user);
		})
		.error(function(err) {
			console.log(err);
			res.status(500).json({msg: 'there was a problem logging in to your account'});
		})
	}));
}