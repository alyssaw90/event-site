'use strict';

var clc = require('cli-color');
var fs = require('fs');
var path = require('path');
var Sql = require('sequelize');
/*var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql('InteropEventsDBTest', 'EventAdmin@interopeventstestserver', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});

var EventImage = module.exports = sql.define('EventImage', {
	imageLink: Sql.STRING
})

EventImage.sync({force: true})
.then(function () {
		fs.readdir(path.join(__dirname, '../uploads/'), function (err, files) {
		var imageArr = [];
		for (var i = 0, j = files.length; i < j; i++) {
			if (files[i] !== '.gitignore') {
				imageArr.push({imageLink: files[i]});
			}
		}
		return EventImage.bulkCreate(imageArr);
	})
})
