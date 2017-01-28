/*This file initializes the ExpressJS server, routes, and node modules.*/

'use strict';

require('dotenv').load();
const express = require('express');
const app = express();
const passport = require('passport');
const clc = require('cli-color');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const models = require('./models');
// initalize sequelize with session store 
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const apiRoutes 		= express.Router();
const authRoutes 	= express.Router();
const catchAllRoutes = express.Router();
process.env.SECRET_KEY = process.env.SECRET_KEY || 'change this change this change this!!!';
let port = process.env.PORT || 3000;
let time = new Date();
let secretKeyReminder = process.env.SECRET_KEY === 'change this change this change this!!!' ?  clc.black.bgRed(`process.env.SECRET_KEY is not secure, change your SECRET_KEY!!!`) : clc.black.bgGreen(`Your SECRET_KEY is secure. You don't need to change your SECRET_KEY`);
console.log(secretKeyReminder);

require('./scripts/passport_strat')(passport);
require(`./scripts/passport_azure`)(passport);
require('./routes/api-routes')(apiRoutes);
require('./routes/catch-all-routes.js')(catchAllRoutes);
require('./routes/auth-routes')(authRoutes, passport);

app.use(compression()) //use compression 
.use(cookieParser(process.env.SESSION_SECRET))
.use(session({ 
		secret: process.env.SESSION_SECRET, 
		resave: false, 
		saveUninitialized: false,
		maxAge: 1000*60*60*8,
		unset: `destroy`,
		store: new SequelizeStore({
			db: models.sql
		}),
		proxy: true
	})
)
.use(passport.initialize()) //initialize passport
.use(passport.session()) //restore the session if there is one
.use( (req, res, next) => { 
	res.setHeader('X-Frame-Options', 'DENY');
	return next();
}) //set header to prevent Clickjacking and Cross-Site Request Forgery (CSRF) attacks
.use(express.static(__dirname + '/')) //use the root directory as the source of static files
.use('/auth/', authRoutes) // use the authRoutes with /auth/ as its root
.use('/api/', apiRoutes) //use the apiRoutes with /api/ as its root
.use('/', catchAllRoutes) //use the root for the catch all route, this must be the last routes file in the list
.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}) //error handling
.listen(port, () => {
	console.log(clc.cyanBright('server started on port ' + port + ' at ' + time));
}); //listen to the port and log when the server has started

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});
