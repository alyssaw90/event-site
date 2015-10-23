'use strict';

var Sql = require('sequelize');
var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var EventSchedule = module.exports = sql.define('EventSchedule', {
	eventId: Sql.INTEGER,
	scheduleDay: Sql.STRING,
	scheduleTime: Sql.STRING,
  description: Sql.TEXT
})

EventSchedule.sync({force: false});