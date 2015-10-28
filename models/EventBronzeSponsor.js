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

var EventBronzeSponsor = module.exports = sql.define('EventBronzeSponsor', {
	eventId: Sql.INTEGER,
	bronzeSponsorName: Sql.TEXT,
	bronzeSponsorLogo: Sql.TEXT,
  bronzeSponsorDesc: Sql.TEXT
})

EventBronzeSponsor.sync({force: false})
  /*.then(function () {
    return EventBronzeSponsor.create({
      eventId: 1,
      bronzeSponsorName: 'Company 5',
      bronzeSponsorLogo: 'logo1.png',
      bronzeSponsorDesc: 'Destroy the blinds knock dish off table head butt cant eat out of my own dish yet eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap i am the best pelt around the house and up and down stairs chasing phantoms.'
    })
  })
  .then(function () {
    return EventBronzeSponsor.create({
      eventId: 1,
      bronzeSponsorName: 'Company 6',
      bronzeSponsorLogo: 'logo1.png',
      bronzeSponsorDesc: 'If it fits, i sits refuse to leave cardboard box but bathe private parts with tongue then lick owner\'s face meow all night having their mate disturbing sleeping humans so leave dead animals as gifts stare at ceiling. Sit in box meowzer!'
    })
  })
  .then(function () {
    return EventBronzeSponsor.create({
      eventId: 2,
      bronzeSponsorName: 'Company 5',
      bronzeSponsorLogo: 'logo1.png',
      bronzeSponsorDesc: 'Destroy the blinds knock dish off table head butt cant eat out of my own dish yet eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap i am the best pelt around the house and up and down stairs chasing phantoms.'
    })
  })
  .then(function () {
    return EventBronzeSponsor.create({
      eventId: 2,
      bronzeSponsorName: 'Company 6',
      bronzeSponsorLogo: 'logo1.png',
      bronzeSponsorDesc: 'If it fits, i sits refuse to leave cardboard box but bathe private parts with tongue then lick owner\'s face meow all night having their mate disturbing sleeping humans so leave dead animals as gifts stare at ceiling. Sit in box meowzer!'
    })
  })*/