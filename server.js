'use strict';

require('dotenv').load();
var express = require('express');
var app = express();
var clc = require('cli-color');
var port = process.env.PORT || 3000;
var time = new Date();
process.env.SECRET_KEY = process.env.SECRET_KEY || 'change this change this change this!!!';

var aboutRouter = express.Router();
var dbRouter = express.Router();
var viewRouter = express.Router();
var adminRouter = express.Router();
// require('./routes/about-routes')(aboutRouter);
require('./routes/db-routes')(dbRouter);
require('./routes/view-routes')(viewRouter);
require('./routes/admin-routes')(adminRouter);


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
console.log(clc.magenta('LLLLLLLLLLL ::::::::::::::  '), process.env.SECRET_KEY)

app.use(express.static(__dirname + '/'));
// app.use('/', aboutRouter);
app.use('/', dbRouter);
app.use('/', viewRouter);
app.use('/', adminRouter);

app.listen(port, function () {
	console.log(clc.cyanBright('server started on port ' + port + ' at ' + time));
});
