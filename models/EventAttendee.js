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

var EventAttendee = module.exports = sql.define('EventAttendee', {
  eventId: Sql.INTEGER,
  attendeeId: Sql.INTEGER,
  eventAttendeeRole: Sql.ENUM('speaker', 'attendee'),
});

EventAttendee.sync({force: false})
/*  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      attendeeId: 1,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      attendeeId: 2,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      attendeeId: 3,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      attendeeId: 4,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      attendeeId: 22,
      eventAttendeeRole: 'attendee'
    })
  })*/