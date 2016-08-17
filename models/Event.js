'use strict';

const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

module.exports = function (sql, DataTypes) {

  return sql.define('Event', {
    eventName: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN,
    lastModifiedBy: DataTypes.STRING,
    eventRegistrationLink: DataTypes.STRING, //link to registrationfor event
    eventLocation: {
      type: DataTypes.STRING,
      set: function (val) {
        this.setDataValue('eventLocation', val.toLowerCase().replace(' ', '_'));
      }
    },
    eventState: DataTypes.TEXT,
    eventCountry: DataTypes.TEXT,
    eventContinent: DataTypes.ENUM('North America', 'South America', 'Africa', 'Asia', 'Europe', 'Oceania'),
    eventStartDate: DataTypes.DATE, //the start date...
    eventEndDate: DataTypes.DATE, // the end date...
    eventHeaderImage: DataTypes.TEXT, //link to header image
    eventHomepageImage: DataTypes.TEXT, //link to homepage image
    eventHighlightColor: DataTypes.TEXT, //what color to use to highlight the homepage
    eventFuturePageImage: DataTypes.TEXT, //image to appear on event slide on homepage
    eventFuturePageText: DataTypes.TEXT, //slide up text for future events page
    /*  eventSlideshowImage: {
        type: DataTypes.TEXT,
        unique: true,
        get: function () {
          return randomTabImages[Math.floor(Math.random() * randomTabImages.length)]
        }
      },*/ //image for front page slider
    eventSpeakers: DataTypes.STRING
  },
  {
    getterMethods: {
      eventUrl: function () {
        let theEventLocation = this.getDataValue('eventLocation');
        let startDate = this.getDataValue('eventStartDate');
        let realStartDate = this.getDataValue('eventStartDate');
        let theUrl;
        if (this.getDataValue('eventStartDate')) {
          startDate.setDate(startDate.getDate() + 1);

        } else {
          startDate = new Date(new Date()
            .getFullYear(), 11, 31);
        }
        if (theEventLocation) {
          theUrl = theEventLocation.replace(/\W/g, '')
            .toLowerCase() + startDate.getFullYear();

        }
        this.setDataValue('eventStartDate', realStartDate);
        return theUrl ? theUrl : '';
      }
      /*,
      eventSlideshowImage: function () {
        let idVal = this.getDataValue('id');
        let imgIndex = Math.floor(idVal / randomTabImages.length);
        return randomTabImages[idVal - imgIndex];
      }*/
    },
    hasTrigger: true,
    paranoid: true
  });


};
