'use strict';

// require('dotenv').load();
// let User = require('../models/User');
const bodyparser = require('body-parser');
// const cookieParser = require('cookie-parser');
const clc = require('cli-color');
const session = require('express-session');
const models = require('../models');
const User = models.User;
const Speaker = models.Speaker;
const Event = models.Event;
const EventTab = models.EventTab;

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
      newUser.$modelOptions.instanceMethods.generateToken(userJSON, process.env.SECRET_KEY, function(err, token) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
        }
        res.json({token: token});
      });             
    });
	});

  router.get('/login', passport.authenticate('basic', { session: true }), (req, res) => {
    let userJSON = {randomString: req.user.dataValues.randomString, id: req.user.dataValues.id};
    res.req.headers.authorization = 'hahaha';
    // res.req.rawHeaders.Authorization = 'blah';
    for (let key in res.req.rawHeaders) {
      if (res.req.rawHeaders[key].slice(0, 5) === 'Basic') {
        res.req.rawHeaders[key] = 'Basic xxxx';
      }
      
    }
    req.user.$modelOptions.instanceMethods.generateToken(userJSON, process.env.SECRET_KEY, (err, token) => {
      if (err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
      }
      req.session.cookie.maxAge = 1000 * 60 * 60;
      res.status('200').json({'admin': req.user.dataValues.isAdmin});
    });
  });

  router.get(`/azurelogin`, passport.authenticate(`provider`, {successRedirect: `/admin/edit-events`}));

  router.get(`/.auth/login/aad/callback`, passport.authenticate(`provider`, { successRedirect: `/admin/edit-events`, failureRedirect: `/admin/login` }), function (req, res) { 
    res.redirect(`/`); 
  });

  
  router.get('/logout', function(req, res) {
    req.logout();
    res.json({msg: 'logged off'});
  });
};