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
	goldSponsorName: Sql.TEXT,
	goldSponsorLogo: Sql.TEXT,
  goldSponsorDesc: Sql.TEXT
})

EventGoldSponsor.sync({force: true})
  .then(function () {
    return EventGoldSponsor.create({
      eventId: 1,
      goldSponsorName: 'Company 3',
      goldSponsorLogo: 'logo1.png',
      goldSponsorDesc: 'Climb a tree, wait for a fireman jump to fireman then scratch his face paw at your fat belly so scamper knock dish off table head butt cant eat out of my own dish lick arm hair, yet fall over dead (not really but gets sypathy). '
    })
  })
  .then(function () {
    return EventGoldSponsor.create({
      eventId: 1,
      goldSponsorName: 'Company 4',
      goldSponsorLogo: 'logo1.png',
      goldSponsorDesc: 'Chirp at birds why must they do that hopped up on catnip find something else more interesting, for lick butt.'
    })
  })
  // .then(function () {
  //   return EventGoldSponsor.create({
  //     eventId: 2,
  //     goldSponsorName: 'Company 3',
  //     goldSponsorLogo: 'logo1.png',
  //     goldSponsorDesc: 'Climb a tree, wait for a fireman jump to fireman then scratch his face paw at your fat belly so scamper knock dish off table head butt cant eat out of my own dish lick arm hair, yet fall over dead (not really but gets sypathy). '
  //   })
  // })
  // .then(function () {
  //   return EventGoldSponsor.create({
  //     eventId: 2,
  //     goldSponsorName: 'Company 4',
  //     goldSponsorLogo: 'logo1.png',
  //     goldSponsorDesc: 'Chirp at birds why must they do that hopped up on catnip find something else more interesting, for lick butt.'
  //   })
  // })
.then(function () {
    return EventGoldSponsor.create({
      eventId: 3,
      goldSponsorName: 'Company 3',
      goldSponsorLogo: 'logo1.png',
      goldSponsorDesc: 'Climb a tree, wait for a fireman jump to fireman then scratch his face paw at your fat belly so scamper knock dish off table head butt cant eat out of my own dish lick arm hair, yet fall over dead (not really but gets sypathy). '
    })
  })
  .then(function () {
    return EventGoldSponsor.create({
      eventId: 3,
      goldSponsorName: 'Company 4',
      goldSponsorLogo: 'logo1.png',
      goldSponsorDesc: 'Chirp at birds why must they do that hopped up on catnip find something else more interesting, for lick butt.'
    })
  })