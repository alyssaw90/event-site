'use strict';

var clc = require('cli-color');
var fs = require('fs');
var path = require('path');
var Sql = require('sequelize');
/*var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
/*var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});*/


var sql = new Sql(process.env.DB_DEV_NAME, process.env.DB_DEV_USER, process.env.DB_DEV_PASS, {
  host: process.env.DB_DEV_HOST,
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
});

// EventImage.sync({force: false})
/*.then(function () {
		fs.readdir(path.join(__dirname, '../uploads/'), function (err, files) {
		var imageArr = [];
		for (var i = 0, j = files.length; i < j; i++) {
			if (files[i] !== '.gitignore') {
				imageArr.push({imageLink: files[i]});
			}
		}
		return EventImage.bulkCreate(imageArr);
	});
});*/
