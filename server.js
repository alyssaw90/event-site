'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var time = new Date();

app.use(express.static(__dirname + '/'));

app.listen(port, function () {
	console.log('server started on port ' + port + ' at ' + time);
});