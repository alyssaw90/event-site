'use strict';

module.exports = (sql, DataTypes) => {

  return sql.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      required: true
    },
    isPublished: DataTypes.BOOLEAN,
    showOnHeader: DataTypes.BOOLEAN,
    lastModifiedBy: DataTypes.STRING,
    eventRegistrationLink: DataTypes.STRING, //link to registrationfor event
    eventUrl: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: true,
      // required: true,
      set: function(val) {
        this.setDataValue('eventUrl', val.replace(/\s+/g, '').toLowerCase() );
      }
    },
    eventLocation: {
      type: DataTypes.STRING,
      set: function(val) {
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
    eventFuturePageImage: DataTypes.TEXT, //image to appear on event slide on homepage
    eventAboutTabText: {
      type: DataTypes.TEXT,
      // required: true
    }, //text for About Page
    eventVenueName: DataTypes.STRING,
    eventVenueAddressLine1: DataTypes.STRING,
    eventVenueAddressLine2: DataTypes.STRING,
    eventParkingInfo: DataTypes.TEXT,
    eventVenueImg: DataTypes.STRING
  },
  {
    hasTrigger: true,
    paranoid: true
  });


};
