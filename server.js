'use strict';

require('dotenv').load();
const express = require('express');
const app = express();
const passport = require('passport');
const clc = require('cli-color');
const compression = require('compression');
let port = process.env.PORT || 3000;
let time = new Date();
process.env.SECRET_KEY = process.env.SECRET_KEY || 'change this change this change this!!!';
let secretKeyReminder;

if (process.env.SECRET_KEY !== 'change this change this change this!!!') {
	secretKeyReminder = clc.black.bgGreen('Your SECRET_KEY is secure. You don\'t need to change your SECRET_KEY');
} else {
	secretKeyReminder = clc.black.bgRed('process.env.SECRET_KEY : change this change this change this!!!');
}

app.use(passport.initialize());

let dbRouter 		= express.Router();
let authRouter 	= express.Router();

require('./scripts/passport_strat')(passport);

require('./routes/db-routes')(dbRouter);
require('./routes/auth-routes')(authRouter, passport);


console.log(secretKeyReminder);

app.use(compression()); //use compression 
app.use(express.static(__dirname + '/'));

app.use('/', dbRouter);
app.use('/auth/', authRouter);

app.listen(port, function () {
	console.log(clc.cyanBright('server started on port ' + port + ' at ' + time));
});
