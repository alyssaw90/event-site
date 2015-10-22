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

var EventOverview = module.exports = sql.define('EventOverview', {
	eventId: Sql.INTEGER,
	headingText: Sql.TEXT,
	paragraphText: Sql.TEXT
})

EventOverview.sync({force: false})