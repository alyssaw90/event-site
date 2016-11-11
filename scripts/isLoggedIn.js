'use strict';
const clc = require(`cli-color`);
const models = require('../models');
const MsUser = models.MsUser;

function isLoggedIn(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  if (req.user.hasOwnProperty('unique_name')) {
    models.sql.sync()
    .then( () => {
      return MsUser.findOne({
        where: {
          email: req.user.unique_name
        }
      });
    })
    .then( (msUser) => {
      if (req.isAuthenticated() && msUser !== null && msUser.email === req.user.unique_name) {// if user is authenticated in the session and the user email matches the user found in the db, carry on
        let isAdmin = msUser.isAdmin === true ? true : false;
        res.cookie(`interopAdmin`, isAdmin);
        return next();    	
      } else {
        // if they aren't send not authorized
        req.logout();
        res.redirect(401, `/admin/login`);    

      }
    })
    .catch( (err) => {
      req.logout();
      res.redirect(401, `/admin/login`);      
    })
  } else if (!req.user.hasOwnProperty('unique_name') && req.isAuthenticated() ) { // if user isn't using OAuth' is authenticated in the session, carry on
    return next();
  } else {
    // if they aren't send not authorized
    res.redirect(401, `/admin/login`);    
  }

}

module.exports = isLoggedIn;