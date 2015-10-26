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
	sponsorName: Sql.TEXT,
	sponsorLogo: Sql.TEXT
})

EventBronzeSponsor.sync({force: false})
/*  .then(function () {
    return EventBronzeSponsor.create({
      eventId: 1,
      sponsorName: 'Company 5',
      sponsorLogo: 'logo1.png'
    })
  })
  .then(function () {
    return EventBronzeSponsor.create({
      eventId: 1,
      sponsorName: 'Company 6',
      sponsorLogo: 'logo1.png'
    })
  })*/