'use strict';

const eat = require('eat');
const models = require('../models');
const User = models.User;
const clc = require('cli-color');

module.exports = (secret) => {
	return (req, res, next) => {
		let token = req.cookies.token || req.headers.token || req.body.token || req.headers.authorization;
		if (!token) {
			console.log(clc.white.bgRed('no token in request'));
			return res.status(401).json({msg: 'not authorized'});
		}
		eat.decode(token, secret, (err, decoded) => {
			if (err) {
				console.log(clc.white.bgRed('Error, login failed:   '), err);
				return res.status(401).json({msg: 'not authorized'});
			}

			User.findOne({where: {id: decoded.id}})
			.then( (user) => {
				// console.log(user);
				if (!user) {
					console.log(clc.white.bgRed('user not found'));
						return res.status(401).json({msg: 'not authorized'});
				}

				req.user = user;
				next();
			})
			.error( (error) => {
				console.log(clc.white.bgRed( 'Error:  '), err);
				return res.status(401).json({msg: 'not authorized'});
			});
		});
	};
};