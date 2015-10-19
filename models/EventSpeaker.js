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

var EventSpeaker = module.exports = sql.define('EventSpeaker', {
  eventName: Sql.STRING,
  eventId: Sql.INTEGER,
  speakerId: Sql.INTEGER
});

EventSpeaker.sync({force: false});
