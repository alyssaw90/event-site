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
	sponsorLogo: Sql.TEXT
})

EventPlatinumSponsor.sync({force: false})
/*  .then(function () {
    return EventPlatinumSponsor.create({
      eventId: 1,
      sponsorName: 'Company 1',
      sponsorLogo: 'logo1.png'
    })
  })
  .then(function () {
    return EventPlatinumSponsor.create({
      eventId: 1,
      sponsorName: 'Company 2',
      sponsorLogo: 'logo1.png'
    })
  })*/