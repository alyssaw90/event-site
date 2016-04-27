'use strict';

var eat = require('eat');
var models = require('../models');
var User = models.User;
var clc = require('cli-color');

module.exports = function(secret) {
	return function(req, res, next) {
		var token = req.cookies.token || req.headers.token || req.body.token;
			// console.log(clc.bgCyanBright(':::::::   '), res);
		if (!token) {
			console.log('unauthorized token in request');
			return res.status(401).redirect('/private');
			// return res.status(401).json({msg: 'not authorized'});
		}
		eat.decode(token, secret, function(err, decoded) {
			if (err) {
				console.log(err);
				return res.status(401).redirect('/private');
				// return res.status(401).json({msg: 'not authorized'});
			}

			User.findOne({where: {id: decoded.id}})
			.then(function(user) {
				// console.log(user);
				if (!user) {
					console.log('user not found');
					return res.status(401).redirect('/private');
					// return res.status(401).json({msg: 'not authorized'});
				}

				req.user = user;
				next();
			})
			.error(function(error) {
				console.log(err);
				return res.status(401).redirect('/private');
				// return res.status(401).json({msg: 'not authorized'});
			});
		});
	};
};