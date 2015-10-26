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

var EventSilverSponsor = module.exports = sql.define('EventSilverSponsor', {
	eventId: Sql.INTEGER,
	sponsorName: Sql.TEXT,
	sponsorLogo: Sql.TEXT,
  sponsorDesc: Sql.TEXT
})

EventSilverSponsor.sync({force: false})
/*  .then(function () {
    return EventSilverSponsor.create({
      eventId: 1,
      sponsorName: 'Company 5',
      sponsorLogo: 'logo1.png',
      sponsorDesc: 'Refuse to drink water except out of someone\'s glass damn that dog yet get video posted to internet for chasing red dot cat snacks, play time, or attack feet.'
    })
  })
  .then(function () {
    return EventSilverSponsor.create({
      eventId: 1,
      sponsorName: 'Company 6',
      sponsorLogo: 'logo1.png',
      sponsorDesc: 'Knock over christmas tree kitty power! so burrow under covers, or chase ball of string, spread kitty litter all over house, stare at ceiling.'
    })
  })*/