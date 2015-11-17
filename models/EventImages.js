'use strict';

var Sql = require('sequelize');
var sql = new Sql('events_page', 'eventsUser', 'p@ssword1', {
	host: 'localhost',
	dialect: 'mssql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

var EventImage = module.exports = sql.define('EventImage', {
	imageLink: Sql.STRING
})

EventImage.sync({force: false})