'use strict';

module.exports = (sql, DataTypes) => {

  return sql.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      required: true
    },
    isPublished: DataTypes.BOOLEAN,
    lastModifiedBy: DataTypes.STRING,
    eventRegistrationLink: DataTypes.STRING, //link to registrationfor event
    eventUrl: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: true,
      // required: true
    },
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
    eventHighlightColor: { 
      type: DataTypes.TEXT,
      get: function() {
        let continent = this.getDataValue('eventContinent');
        let continentColors = {'North America': 'ffb900', 'South America': '107c10', 'Africa': 'e81123', 'Asia': '0078d7', 'Europe': '5c2d91', 'Oceania': 'b4009e'};
        return continentColors[continent];
      }
    }, //what color to use to highlight the homepage
    eventFuturePageImage: DataTypes.TEXT, //image to appear on event slide on homepage
    eventAboutTabText: {
      type: DataTypes.TEXT,
      required: true
    }, //text for About Page
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
    hasTrigger: true,
    paranoid: true
  });


};
