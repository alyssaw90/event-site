'use strict';
const clc = require(`cli-color`);
const models = require('../models');
const MsUser = models.MsUser;

function isLoggedIn(req, res, next) {
  console.log(clc.red.bgBlue(` ::: `), req.user);
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
      
        console.log(clc.white.bgCyan('ONE USER :: '), req.user.unique_name, `\n`,clc.white.bgCyan('Two USER :: '), msUser, `\n`,clc.white.bgCyan('Three USER :: '), msUser.email === req.user.unique_name);
      if (req.isAuthenticated() && msUser.email === req.user.unique_name) {// if user is authenticated in the session and the user email matches the user found in the db, carry on
        return next();    	
      } else {
        // if they aren't send not authorized
        res.status('401').json({err: 'not authorized'});    

      }
    })
  } else if (req.isAuthenticated() ) { // if user isn't using OAuth' is authenticated in the session, carry on
    return next();
  } else {
    // if they aren't send not authorized
    res.status('401').json({err: 'not authorized'});

  }

}

module.exports = isLoggedIn;