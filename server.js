'use strict';

var express = require('express');
var app = express();
var clc = require('cli-color');
var port = process.env.PORT || 3000;
var time = new Date();
/*var Sql = require('sequelize');
var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/

var aboutRouter = express.Router();
var dbRouter = express.Router();
var viewRouter = express.Router();
require('./routes/about-routes')(aboutRouter);
require('./routes/db-routes')(dbRouter);
require('./routes/view-routes')(viewRouter);


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));
app.use('/', aboutRouter);
app.use('/', dbRouter);
app.use('/', viewRouter);

app.listen(port, function () {
	console.log(clc.cyanBright('server started on port ' + port + ' at ' + time));
});
