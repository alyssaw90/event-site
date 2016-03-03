'use strict';

require('dotenv').load();
var User = require('../models/User');
var bodyparser = require('body-parser');
var clc = require('cli-color');
var Sql = require('sequelize');
var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
/*var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});*/

function makeRandomString () {
  var outputString = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
  var randomNumber = Math.ceil(Math.random() * 10) + 10;
  for ( var i = 0; i < randomNumber; i++ ) {
    outputString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return outputString;
}

sql.authenticate()
  .then(function (err) {
    if (err) {
      console.log(clc.xterm(202)('Unable to connect to the database: '), err);
    } else {
      console.log(clc.xterm(202)('Connection has been established successfully.'));
    }
  });

module.exports = function(router, passport) {
	router.use(bodyparser.json());
  router.use(bodyparser.urlencoded({
    extended: true
  }));

	router.route('/create-user')
	.post(function(req, res) {
		sql.sync()
		.then(function() {
			return User.find({where: {email: req.body.email}})
    })
		.then(function(user) {
			if (user) {
				res.status(419).json({msg: 'email address alread in use'});
			}
			if (!user) {
				return User.create({userName: req.body.userName, email: req.body.email, randomString: makeRandomString()})
      }
    })
    .then(function(newUser) {
      var hashPass = newUser.$modelOptions.instanceMethods.generateHash(req.body.password);
      delete req.body.password;
      newUser.update({password: hashPass});
      console.log(newUser);
		  // res.status(200).json({msg: 'user created'});
      newUser.$modelOptions.instanceMethods.generateToken(process.env.SECRET_KEY, function(err, token) {
        // console.log(clc.cyanBright('::::::::   '), process.env.SECRET_KEY, makeRandomString())
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
        }
        res.json({token: token});
      });             
    });
	});

  router.get('/login', function(req, res, next) {
    passport.authenticate('basic', {session: false}, function(err, user, info) {
      //if user is found, but there is some other error
      if (err && user) { 
        console.log(clc.redBright('Login error: '), err);
        res.json({msg: 'internal server error'});
      }
      // if user is not found due to wrong username or password
      if (err && !user) {
        console.log(clc.redBright('Login error: '), err);
        res.json({msg: 'invalid username or password'});
      }
      //if the user is found and there is no error
      if (user && !err) {
      var userEmail = user.dataValues.email;
        // res.json({msg: 'authenticated as ', userEmail});
        user.$modelOptions.instanceMethods.generateToken(user.dataValues.randomString, function(err, token) {
          console.log(clc.yellow(':::::   '), process.env.SECRET_KEY);
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'error generating token'});
          }
          res.json({token: token});
        });
      }
    })(req, res, next);
  });

}