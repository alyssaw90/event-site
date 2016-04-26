'use strict';

require('dotenv').load();
let clc = require('cli-color');
let fs = require('fs');
let path = require('path');
let Sql = require('sequelize');
let sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
/*let sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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


/*let sql = new Sql(process.env.DB_DEV_NAME, process.env.DB_DEV_USER, process.env.DB_DEV_PASS, {
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
});*/

let EventImage = module.exports = sql.define('EventImage', {
	imageLink: Sql.STRING
});

// EventImage.sync({force: false})
/*.then(function () {
		fs.readdir(path.join(__dirname, '../uploads/'), function (err, files) {
		let imageArr = [];
		for (let i = 0, j = files.length; i < j; i++) {
			if (files[i] !== '.gitignore') {
				imageArr.push({imageLink: files[i]});
			}
		}
		return EventImage.bulkCreate(imageArr);
	});
});*/
