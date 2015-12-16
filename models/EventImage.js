// 'use strict';

// var clc = require('cli-color');
// var fs = require('fs');
// var path = require('path');
// var Sql = require('sequelize');
// var sql = new Sql('events_page', 'eventsUser', 'p@ssword1', {
// 	host: 'localhost',
// 	dialect: 'mssql',
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		idle: 10000
// 	}
// });

// var EventImage = module.exports = sql.define('EventImage', {
// 	imageLink: Sql.STRING
// })

// fs.readdir(path.join(__dirname, '../uploads/'), function (err, files) {
// 		console.log(clc.yellow('KKKKKKK :::::::::::  ', files))
// 	})

// EventImage.sync({force: true})
// /*.then(function () {
// 	fs.readdir(path.join(__dirname, '../uploads/'), function (err, files) {
// 		var imageArr = [];
// 		for (var i = 0, j = files.length; i < j; i++) {
// 			if (files[i] !== '.gitignore') {
// 				imageArr.push({imageLink: files[i]});
// 			}
// 		}
// 			console.log(clc.yellow('KKKKKKK :::::::::::  '), imageArr)
// 		return EventImage.bulkCreate(imageArr);
// 	})
// })
// */
// .then(function () {
// 	return EventImage.create({
// 		imageLink: 'hello.jpg'
// 	})
// })

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
/*var sql = new Sql('Driver={SQL Server Native Client 11.0};Server=tcp:interopeventstestserver.database.windows.net,1433;Database=InteropEventsDBTest;Uid=EventAdmin@interopeventstestserver;Pwd={Event.4ever!};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;', {
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql('InteropEventsDBTest', 'EventAdmin', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
  dialect: 'mssql',
  port: 1433,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
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
