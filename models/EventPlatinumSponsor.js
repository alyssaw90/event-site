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

var EventPlatinumSponsor = module.exports = sql.define('EventPlatinumSponsor', {
	eventId: Sql.INTEGER,
	sponsorName: Sql.TEXT,
	sponsorLogo: Sql.TEXT,
  sponsorDesc: Sql.TEXT
})

EventPlatinumSponsor.sync({force: false})
/*  .then(function () {
    return EventPlatinumSponsor.create({
      eventId: 1,
      sponsorName: 'Company 1',
      sponsorLogo: 'logo1.png',
      sponsorDesc: 'Cat ipsum dolor sit amet, refuse to drink water except out of someone\'s glass and knock over christmas tree. Tuxedo cats always looking dapper.'
    })
  })
  .then(function () {
    return EventPlatinumSponsor.create({
      eventId: 1,
      sponsorName: 'Company 2',
      sponsorLogo: 'logo1.png',
      sponsorDesc: 'Curl into a furry donut meow. Then cats take over the world spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce or jump around on couch, meow constantly until given food, see owner, run in terror.'
    })
  })*/