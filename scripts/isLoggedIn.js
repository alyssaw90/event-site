'use strict';
const clc = require(`cli-color`);

function isLoggedIn(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  console.log(clc.white.bgGreen( ' :: '), req.session);
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();    	
  }

  // if they aren't send not authorized
  res.status('401').json({err: 'not authorized'});
}

module.exports = isLoggedIn;