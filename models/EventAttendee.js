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
  contactId: Sql.INTEGER,
  eventAttendeeRole: Sql.ENUM('speaker', 'attendee', 'technical support', 'audio visual support'),
});

EventAttendee.sync({force: true})
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      contactId: 1,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      contactId: 2,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      contactId: 3,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      contactId: 4,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 1,
      contactId: 22,
      eventAttendeeRole: 'attendee'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 2,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 8,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 4,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 5,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 3,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 6,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 16,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 22,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 23,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 24,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 25,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 26,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 27,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 3,
      contactId: 7,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 2,
      contactId: 9,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 3,
      contactId: 9,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 3,
      contactId: 10,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 3,
      contactId: 11,
      eventAttendeeRole: 'speaker'
    })
  })
  .then(function () {
    return EventAttendee.create({
      eventId: 3,
      contactId: 1,
      eventAttendeeRole: 'attendee'
    })
  })