'use strict';

var Basic = require('passport-http').BasicStrategy;
var Digest = require('passport-http').DigestStrategy;
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

// This route works!!!!!!
/*module.exports = function(passport) {
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
}*/

// This route works!!!!!!
module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    var userInfo = email + password + '}';
    // var userEmail = JSON.parse(userInfo);
        console.log(clc.blueBright('email ::::   '), email);
    User.findOne({where: {email: email}})
      .then(function(user) {
        if (user) {
          var verified = user.$modelOptions.instanceMethods.verifyPassword(password, user.dataValues.password);
        }
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

/*module.exports = function(passport) {
  passport.use('digest', new Digest({ qop: 'auth' },
    function(email, done) {
      User.findOne({ email: email }, function (err, user) {
        console.log(user);
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, user.password);
      });
    },
    function(params, done) {
      // validate nonces as necessary
      done(null, true)
    }
  ));
}*/

/*module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    User.findOne({where: {email: email}})
    .then(function (user) {

      if (user) {
        var verified = user.$modelOptions.instanceMethods.verifyPassword(password, user.dataValues.password);
      console.log(clc.red('hola mundo    '), user.$modelOptions.instanceMethods);
      }
      console.log(clc.greenBright('Done Callback ::::   '), done);
      if (!user) {
        return done(null, 'no such user');
      }
      if (user && !verified) {
        return done(null, 'wrong password');
      }

      if (user && verified) {
        // console.log(clc.blueBright('password matched'));
        // user.instanceMethods = user.$modelOptions.instanceMethods
        // return done(null, user);
        var ranJSON = {randomString: user.dataValues.randomString};
        user.$modelOptions.instanceMethods.generateToken(ranJSON, process.env.SECRET_KEY, function(err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'error generating token'});
          }
          // res.json({token: token});
          return done(null, token);
        });
      }
    })
    .error(function(err) {
      console.log(err);
      res.status(500).json({msg: 'there was a problem logging in to your account'});
      done(err);
    })
  }));
} */