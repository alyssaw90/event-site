// Event Model
'use strict';

module.exports = (sql, DataTypes) => {

  return sql.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      required: true
    },
    isPublished: DataTypes.BOOLEAN, // is event published or a draft
    showOnHeader: DataTypes.BOOLEAN, // show on colored bar or find event page
    lastModifiedBy: DataTypes.STRING,
    eventRegistrationLink: DataTypes.STRING, //link to registration for event
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
    eventContinent: {
      type: DataTypes.ENUM('North America', 'South America', 'Africa', 'Asia', 'Europe', 'Oceania'),
      defaultValue: `North America`
    },
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
    eventVenueImg: DataTypes.STRING,
    eventLanguage: DataTypes.STRING,
    eventAccommodations: DataTypes.STRING,
    eventHackathon: DataTypes.STRING,
    eventIOLab: DataTypes.STRING,
    eventWorkshop: DataTypes.STRING,
    eventAgenda: DataTypes.STRING,
    eventAccommodationImg: DataTypes.STRING,
    eventHackathonImg: DataTypes.STRING,
    eventWorkshopImg: DataTypes.STRING,
    eventIOLabImg: DataTypes.STRING
  },
  {
    hasTrigger: true,
    paranoid: false
  });


};
