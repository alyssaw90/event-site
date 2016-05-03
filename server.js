'use strict';

require('dotenv').load();
let express = require('express');
let app = express();
let passport = require('passport');
let clc = require('cli-color');
let port = process.env.PORT || 3000;
let time = new Date();
process.env.SECRET_KEY = process.env.SECRET_KEY || 'change this change this change this!!!';
let secretKeyReminder;

if (process.env.SECRET_KEY !== 'change this change this change this!!!') {
	secretKeyReminder = clc.black.bgGreen('Your SECRET_KEY is secure. You don\'t need to change your SECRET_KEY');
} else {
	secretKeyReminder = clc.black.bgRed('process.env.SECRET_KEY : change this change this change this!!!');
}

// create a generic "terminator" to stop server 
function terminator(sig){
    if (typeof sig === 'string') {
       console.log('%s: Received %s - terminating sample app ...',
                   Date(Date.now()), sig);
       process.exit(1);
    }
    console.log(clc.bgRed('%s: Node server stopped.'), Date(Date.now()) );
};

// then implement it for every process signal related to exit/quit
['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
].forEach(function(element, index, array) {
    process.on(element, function() { terminator(element); });
});

app.use(passport.initialize());

let dbRouter 		= express.Router();
let authRouter 	= express.Router();

require('./scripts/passport_strat')(passport);

require('./routes/db-routes')(dbRouter);
require('./routes/auth-routes')(authRouter, passport);


console.log(secretKeyReminder);

app.use(express.static(__dirname + '/'));

app.use('/', dbRouter);
app.use('/auth/', authRouter);

app.listen(port, function () {
	console.log(clc.cyanBright('server started on port ' + port + ' at ' + time));
});
