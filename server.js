'use strict';

var express = require('express');
var app = express();
var passport = require('passport');
var clc = require('cli-color');
var port = process.env.PORT || 3000;
var time = new Date();
var fs = require('fs');
var testEnv = fs.statSync('./.env');
process.env.SECRET_KEY = process.env.SECRET_KEY || 'change this change this change this!!!';
console.log(clc.magenta('process.env.SECRET_KEY ::::::::::::::  '), testEnv, clc.magenta('    ::::::     '), testEnv.isFile());
if (testEnv.isFile()) {
	// require('dotenv').load();
	console.log(clc.greenBright('file found!!!!'));
}


app.use(passport.initialize());

var dbRouter 		= express.Router();
var authRouter 	= express.Router();

require('./scripts/passport_strat')(passport);

require('./routes/db-routes')(dbRouter);
require('./routes/auth-routes')(authRouter, passport);



app.use(express.static(__dirname + '/'));

app.use('/', dbRouter);
app.use('/auth/', authRouter);

app.listen(port, function () {
	console.log(clc.cyanBright('server started on port ' + port + ' at ' + time));
});
