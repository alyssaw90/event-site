'use strict';

require('dotenv').load();
var express = require('express');
var app = express();
var passport = require('passport');
var clc = require('cli-color');
var port = process.env.PORT || 3000;
var time = new Date();
process.env.SECRET_KEY = process.env.SECRET_KEY || 'change this change this change this!!!';

app.use(passport.initialize());

var dbRouter 		= express.Router();
// var adminRouter = express.Router();
var authRouter 	= express.Router();

require('./lib/passport_strat')(passport);

require('./routes/db-routes')(dbRouter);
require('./routes/auth-routes')(authRouter, passport);
// require('./routes/admin-routes')(adminRouter);


console.log(clc.magenta('process.env.SECRET_KEY ::::::::::::::  '), process.env.SECRET_KEY);

app.use(express.static(__dirname + '/'));

app.use('/', dbRouter);
// app.use('/', adminRouter);
app.use('/auth/', authRouter);

app.listen(port, function () {
	console.log(clc.cyanBright('server started on port ' + port + ' at ' + time));
});
