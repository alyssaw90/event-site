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
      unique: true,
      allowNull: true,
      required: true,
      set: function(val) {
        this.setDataValue('eventUrl', val.replace(/\s+/g, '').toLowerCase() );
      }
    },
    eventLocation:  DataTypes.STRING,
    eventState: DataTypes.TEXT,
    eventCountry: DataTypes.TEXT,
    eventContinent: DataTypes.ENUM('North America', 'South America', 'Africa', 'Asia', 'Europe', 'Oceania'),
    eventStartDate: DataTypes.DATE, //the start date...
    eventEndDate: DataTypes.DATE, // the end date...
    eventHeaderImage: DataTypes.TEXT, //link to header image
    eventTechnicalTopics: DataTypes.TEXT, //List of technical topics to display on past events page
    eventAboutTabText: {
      type: DataTypes.TEXT,
      // required: true
    }, //text for About Page
    eventVenueName: DataTypes.STRING,
    eventVenueAddress: DataTypes.STRING,
    eventParkingInfo: DataTypes.TEXT,
    eventVenueImg: DataTypes.STRING
  },
  {
    hasTrigger: true,
    paranoid: true
  });


};
