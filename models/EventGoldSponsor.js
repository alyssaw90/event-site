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

var EventGoldSponsor = module.exports = sql.define('EventGoldSponsor', {
	eventId: Sql.INTEGER,
	sponsorName: Sql.TEXT,
	sponsorLogo: Sql.TEXT
})

EventGoldSponsor.sync({force: false})
/*  .then(function () {
    return EventGoldSponsor.create({
      eventId: 1,
      sponsorName: 'Company 3',
      sponsorLogo: 'logo1.png'
    })
  })
  .then(function () {
    return EventGoldSponsor.create({
      eventId: 1,
      sponsorName: 'Company 4',
      sponsorLogo: 'logo1.png'
    })
  })*/