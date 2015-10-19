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

var Event = module.exports = sql.define('Event', {
  eventName: Sql.STRING,
  eventLocation: Sql.STRING,
  eventAttendees: Sql.INTEGER,
  eventSpeakers: Sql.INTEGER
});

Event.sync({force: false});
