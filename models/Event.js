'use strict';

var fs = require('fs');
var path = require('path');
var Sql = require('sequelize');
/*var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
/*var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});*/

var sql = new Sql(process.env.DB_DEV_NAME, process.env.DB_DEV_USER, process.env.DB_DEV_PASS, {
  host: process.env.DB_DEV_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});


var Event = module.exports = sql.define('Event', {
  eventName: Sql.STRING,
  eventRegistrationLink: Sql.STRING, //link to registrationfor event
  eventLocation: Sql.STRING,
  eventContinent: Sql.ENUM('North America', 'South America', 'Africa', 'Asia', 'Europe', 'Oceania'),
  eventStartDate: Sql.DATE, //the start date...
  eventEndDate: Sql.DATE, // the end date...
  eventHeaderImage: Sql.TEXT, //link to header image
  eventHomepageImage: Sql.TEXT, //link to homepage image
  eventHighlightColor: Sql.TEXT, //what color to use to highlight the homepage
  eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
  eventFuturePageText: Sql.TEXT, //slide up text for future events page
/*  eventSlideshowImage: {
    type: Sql.TEXT,
    unique: true,
    get: function () {
      return randomTabImages[Math.floor(Math.random() * randomTabImages.length)]
    }
  },*/ //image for front page slider
  eventSpeakers: Sql.STRING
},
{
  getterMethods   : {
    eventUrl: function () {
      var theEventLocation = this.getDataValue('eventLocation');
      var startDate = this.getDataValue('eventStartDate');
      var theUrl = theEventLocation.replace(/\W/g, '').toLowerCase() + '-' + startDate.getFullYear();
      return theEventLocation.replace(/\W/g, '').toLowerCase() + startDate.getFullYear();
    }/*,
    eventSlideshowImage: function () {
      var idVal = this.getDataValue('id');
      var imgIndex = Math.floor(idVal / randomTabImages.length);
      return randomTabImages[idVal - imgIndex];
    }*/
  }
});

/*Event.sync({force: true})
.then(function () {
  return Event.create({
    eventName: 'DevDays Asia 2016 @Taipei',
    eventStartDate: new Date('2016-04-19:08:00:00'),
    eventEndDate: new Date('2016-04-21:23:00:00'),
    eventLocation: 'Taipei',
    eventContinent: 'Asia',
    eventHeaderImage: 'TAIPEIHeader.png',
    eventHomepageImage: 'TAIPEIHeader.png',
    eventHighlightColor: '#4668c5',
    eventSpeakers: '1,2,8,11,15,9,12,10,6,32,33,34,35'
    
  });
})
.then(function () {
  return Event.create({
    eventName: 'Extend Conference',
    // eventRegistrationLink: , //link to registrationfor event
    eventLocation: 'Paris',
    eventContinent: 'Europe',
    eventStartDate: new Date('2016-05-11:00:00:01'), //the start date...
    eventEndDate: new Date('2016-05-12:23:59:00'), // the end date...
    eventHeaderImage: 'extend-gray.jpg', //link to header image
    eventHomepageImage: 'extend-gray.jpg',
    eventHighlightColor: '#5c2d91',
    eventSpeakers: '1,2,9,12,8,15,11,10,6'
  });
})
.then(function () {
  return Event.create({
  eventName: 'Redmond Protocols Plugfest & Windows Interoperability (IO) Lab',
  // eventRegistrationLink: Sql.STRING, //link to registrationfor event
  eventLocation: 'Redmond',
  eventContinent: 'North America',
  eventStartDate: new Date('2016-06-13:00:01:00'), //the start date...
  eventEndDate: new Date('2016-06-24:01:00:00'), // the end date...
  eventHeaderImage: 'plugfest-io-lab-heade.png', //link to header image
  eventHomepageImage: 'plugfest-io-lab-heade.png',
  eventHighlightColor: '#ffb900',
  eventSpeakers: '1,2,3,5,9,8,11,15,12,10,6,21,14,18,16'
  });
})*/