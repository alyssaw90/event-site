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

EventSchedule.sync({force: false})
  /*.then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Friday',
      scheduleTime: '9 - 11',
      description: 'cheese tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Friday',
      scheduleTime: '11 - 1',
      description: 'Lunch'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Friday',
      scheduleTime: '11 - 3',
      description: 'wine tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Friday',
      scheduleTime: '3 - 6',
      description: 'beer tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Saturday',
      scheduleTime: '9 - 11',
      description: 'Breakfast'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Saturday',
      scheduleTime: '11 - 1',
      description: 'Meat Tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Saturday',
      scheduleTime: '11 - 3',
      description: 'Whiskey tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Saturday',
      scheduleTime: '3 - 6',
      description: 'Gladiatorial Games'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Sunday',
      scheduleTime: '9 - 11',
      description: 'Meet with Dahli Lama'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Sunday',
      scheduleTime: '11 - 1',
      description: 'Vegatable tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Sunday',
      scheduleTime: '11 - 3',
      description: 'Plan take over of world'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Sunday',
      scheduleTime: '3 - 6',
      description: 'watch Mad Max'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Friday',
      scheduleTime: '9 - 11',
      description: 'cheese tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Friday',
      scheduleTime: '11 - 1',
      description: 'Lunch'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Friday',
      scheduleTime: '11 - 3',
      description: 'wine tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Friday',
      scheduleTime: '3 - 6',
      description: 'beer tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Saturday',
      scheduleTime: '9 - 11',
      description: 'Breakfast'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Saturday',
      scheduleTime: '11 - 1',
      description: 'Meat Tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Saturday',
      scheduleTime: '11 - 3',
      description: 'Whiskey tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Saturday',
      scheduleTime: '3 - 6',
      description: 'Gladiatorial Games'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Sunday',
      scheduleTime: '9 - 11',
      description: 'Meet with Dahli Lama'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Sunday',
      scheduleTime: '11 - 1',
      description: 'Vegatable tasting'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Sunday',
      scheduleTime: '11 - 3',
      description: 'Plan take over of world'
    })
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Sunday',
      scheduleTime: '3 - 6',
      description: 'watch Mad Max'
    })
  })*/