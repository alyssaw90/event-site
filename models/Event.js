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
  eventDateString: Sql.STRING, //string of the date of event
  eventHeaderImage: Sql.TEXT, //bas64 string of header image
  eventBackgroundImage: Sql.TEXT, //image to appear on event block on future events page
  eventSlideUpText: Sql.TEXT //slide up text for future events page
});

Event.sync({force: false})
/*  .then(function () {
    return Event.create({
      eventName: Sql.STRING,
      eventLocation: Sql.STRING,
      eventDateString: Sql.STRING, 
      eventHeaderImage: Sql.TEXT,
      eventBackgroundImage: Sql.TEXT,
    })
  })*/