'use strict';

// require('dotenv').load();
// let User = require('../models/User');
let bodyparser = require('body-parser');
let cookieParser = require('cookie-parser');
let clc = require('cli-color');
let models = require('../models');
let User = models.User;
let Contact = models.Contact;
let Event = models.Event;
let EventTab = models.EventTab;

function makeRandomString () {
  let outputString = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
  let randomNumber = Math.ceil(Math.random() * 10) + 10;
  for ( let i = 0; i < randomNumber; i++ ) {
    outputString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return outputString;
}

models.sql.authenticate()
  .then(function (err) {
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
  router.use(cookieParser());

	router.route('/create-user')
	.post(function(req, res) {
		models.sql.sync()
		.then(function() {
			return User.find({where: {email: req.body.email}});
    })
		.then(function(user) {
			if (user) {
				res.status(419).json({msg: 'email address alread in use'});
			}
			if (!user) {
				return User.create({userName: req.body.userName, email: req.body.email, randomString: makeRandomString()});
      }
    })
    .then(function(newUser) {
      let hashPass = newUser.$modelOptions.instanceMethods.generateHash(req.body.password);
      let userJSON = {randomString: newUser.dataValues.randomString, id: newUser.dataValues.id};
      delete req.body.password;
      newUser.update({password: hashPass});
		  // res.status(200).json({msg: 'user created'});
      // console.log(clc.cyanBright('::::::::   '), newUser.dataValues.randomString);
      newUser.$modelOptions.instanceMethods.generateToken(userJSON, process.env.SECRET_KEY, function(err, token) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
        }
        res.json({token: token});
      });             
    });
	});

/*  router.get('/login', function(req, res, next) {
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
        let userEmail = user.dataValues.email;
        let ranJSON = {randomString: user.dataValues.randomString};
        console.log(clc.red('::::::    '), user.$modelOptions.instanceMethods.generateToken);
        // res.json({msg: 'authenticated as ', userEmail});
        user.$modelOptions.instanceMethods.generateToken(ranJSON, process.env.SECRET_KEY, function(err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'error generating token'});
          }
          res.json({token: token});
        });
      }
    })(req, res, next);
  });*/

  router.get('/login', passport.authenticate('basic', { session: false }), (req, res) => {
    let userJSON = {randomString: req.user.dataValues.randomString, id: req.user.dataValues.id};
    res.req.headers.authorization = 'hahaha';
    // res.req.rawHeaders.Authorization = 'blah';
    for (let key in res.req.rawHeaders) {
      if (res.req.rawHeaders[key].slice(0, 5) === 'Basic') {
        res.req.rawHeaders[key] = 'Basic xxxx';
      }
      
    }
    // console.log(clc.greenBright('Cookies: '), '     :::::     ', res.req.rawHeaders);
    req.user.$modelOptions.instanceMethods.generateToken(userJSON, process.env.SECRET_KEY, (err, token) => {
        if (err) {
            console.log(err);
            return res.status(500).json({msg: 'error generating token'});
        }
        
        res.status('200').header('token', token).json({token: token, 'admin': req.user.dataValues.isAdmin, 'username': req.user.dataValues.userName, 'email': req.user.dataValues.email});
      });
    });

  /*router.get('/logout', function(req, res) {
    console.log(clc.cyanBright(':::::      '), req.rawHeaders);
    console.log(clc.greenBright(':::::      '), req.cookies);
    res.end('the end');
  })*/
};