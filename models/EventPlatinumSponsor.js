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
	platinumSponsorName: Sql.TEXT,
	platinumSponsorLogo: Sql.TEXT,
  platinumSponsorDesc: Sql.TEXT
})

EventPlatinumSponsor.sync({force: true})
  .then(function () {
    return EventPlatinumSponsor.create({
      eventId: 1,
      platinumSponsorName: 'Company 1',
      platinumSponsorLogo: 'logo1.png',
      platinumSponsorDesc: 'Cat ipsum dolor sit amet, refuse to drink water except out of someone\'s glass and knock over christmas tree. Tuxedo cats always looking dapper.'
    })
  })
  .then(function () {
    return EventPlatinumSponsor.create({
      eventId: 1,
      platinumSponsorName: 'Company 2',
      platinumSponsorLogo: 'logo1.png',
      platinumSponsorDesc: 'Curl into a furry donut meow. Then cats take over the world spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce or jump around on couch, meow constantly until given food, see owner, run in terror.'
    })
  })
  // .then(function () {
  //   return EventPlatinumSponsor.create({
  //     eventId: 2,
  //     platinumSponsorName: 'Company 1',
  //     platinumSponsorLogo: 'logo1.png',
  //     platinumSponsorDesc: 'Cat ipsum dolor sit amet, refuse to drink water except out of someone\'s glass and knock over christmas tree. Tuxedo cats always looking dapper.'
  //   })
  // })
  // .then(function () {
  //   return EventPlatinumSponsor.create({
  //     eventId: 2,
  //     platinumSponsorName: 'Company 2',
  //     platinumSponsorLogo: 'logo1.png',
  //     platinumSponsorDesc: 'Curl into a furry donut meow. Then cats take over the world spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce or jump around on couch, meow constantly until given food, see owner, run in terror.'
  //   })
  // })
  .then(function () {
    return EventPlatinumSponsor.create({
      eventId: 3,
      platinumSponsorName: 'Company 1',
      platinumSponsorLogo: 'logo1.png',
      platinumSponsorDesc: 'Cat ipsum dolor sit amet, refuse to drink water except out of someone\'s glass and knock over christmas tree. Tuxedo cats always looking dapper.'
    })
  })
  .then(function () {
    return EventPlatinumSponsor.create({
      eventId: 3,
      platinumSponsorName: 'Company 2',
      platinumSponsorLogo: 'logo1.png',
      platinumSponsorDesc: 'Curl into a furry donut meow. Then cats take over the world spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce or jump around on couch, meow constantly until given food, see owner, run in terror.'
    })
  })