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

var EventTravel = module.exports = sql.define('EventTravel', {
	eventId: Sql.INTEGER,
	aboveMapHeader: Sql.TEXT,
  belowMapHeading: Sql.TEXT,
  mapDesc: Sql.TEXT,
  mapImapHtml: Sql.TEXT,
  venueName: Sql.TEXT,
  venueStreetAddress: Sql.TEXT,
  venueCityName: Sql.TEXT,
  venueDesc: Sql.TEXT,
  venueImage: Sql.TEXT,
  travelHeading: Sql.TEXT,
  travelDesc: Sql.TEXT,
  travelImage: Sql.TEXT,
  accommodationHeading: Sql.TEXT,
  accommodationParagraph: Sql.TEXT,
  tipsDivHeading: Sql.TEXT,
  tipsDivParagraph: Sql.TEXT,
  eatAndDrinkHeading: Sql.TEXT
})

EventTravel.sync({force: true})
  .then(function () {
    return EventTravel.create({
      eventId: 1,
      aboveMapHeader: 'Outer Space',
      belowMapHeading: 'The Storage Developer Conference will be held in Outer Space',
      mapDesc: 'Jennifer. Whoa, whoa, Biff, what\'s that? Sam, quit fiddling with that thing and come in here and eat your dinner. Yeah, where does he live? Yoo.',
      mapImapHtml: '<div><iframe width="800" height="500" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=500&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe></div>',
      venueName: 'A Crater',
      venueImage: '',
      venueStreetAddress: '123 Space Ave.',
      venueCityName: '3rd Planet from the sun, The Universe',
      venueDesc: 'Ancient alien contend DNA manipulation the vedas ancient religions flying vessels, extraterrestrial spaceships clearly Chariot of the Gods Indian texts, Giorgio technology Easter island Ezekiel alien burmuta triangle SETI. Gods sun disc mercury Nazca lines astronaut pyramids, portal burmuta triangle clearly space brothers sightings, Sumerian texts UFO ancient alien theorists.',
      travelHeading: 'The Moon',
      travelDesc: 'Ancient alien extraterrestrial sanskrit Mahabharata vortex UFO aircraft Vymaanika-Shaastra, evidence ancient civilization sky people choral castle, clearly grey UFO Machu Picchu Easter island. Ancient religions sun disc mercury legendary times, I know it sounds crazy... Petroglyph contend clearly space time helicopter heiroglyph. Chariot of the Gods spaceships, Annunaki ancient religions.',
      travelImage: null,
      accommodationHeading: 'Accommodations',
      accommodationParagraph: 'Ancient alien sightings Easter island DNA manipulation, otherworldly visitors earth mound Indian texts, burmuta triangle ancient religions contend. Helicopter heiroglyph choral castle evidence targeted mutation otherworldly visitors ancient god, sanskrit cover up petroglyph ancient alien theorists Mahabharata, aircraft vortex the vedas pre-colonial aerodynamics ancient god. Flying vessels crystal skull, Mayan.',
      tipsDivHeading: 'These are the voyages of the Starship Enterprise.',
      tipsDivParagraph: 'We need to neutralize the homing signal. Each unit has total environmental control, gravity, temperature, atmosphere, light, in a protective field. Sensors show energy readings in your area. We had a forced chamber explosion in the resonator coil. Field strength has increased by 3,000 percent.',
      eatAndDrinkHeading: 'Eat at One of these Restaurants'
      })
  })
  .then(function () {
    return EventTravel.create({
      eventId: 2,
      aboveMapHeader: 'Shanghai',
      belowMapHeading: 'a completely different conference will be held in Santa Clara, CA',
      mapDesc: 'Jennifer. Whoa, whoa, Biff, what\'s that? Sam, quit fiddling with that thing and come in here and eat your dinner. Yeah, where does he live? Yoo.',
      mapImapHtml: '<div><iframe width="600" height="400" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=31.241690~121.477150&amp;lvl=13&amp;w=600&amp;h=400&amp;sty=r&amp;typ=d&amp;pp=Huangpu%2C%20Shanghai~~31.241690~121.477150&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe><div style="margin: 12px 0 0 0;"><a target="_blank" href="http://www.bing.com/maps/?cp=31.241690~121.477150&amp;sty=r&amp;lvl=13&amp;sp=point.31.241690_121.477150_Huangpu%2C%20Shanghai_&amp;mm_embed=map">View larger map</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=31.241690~121.477150&amp;sty=r&amp;lvl=13&amp;rtp=~pos.31.241690_121.477150_Huangpu%2C%20Shanghai_&amp;mm_embed=dir">Get directions</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=p667m4v3pskm&amp;sty=b&amp;lvl=18&amp;sp=point.31.241690_121.477150_Huangpu%2C%20Shanghai_&amp;mm_embed=be">View bird\'s eye</a></div></div>',
      venueName: 'Shanghai Marriott Hotel City Centre',
      venueImage: 'shamc_main01.jpg',
      venueStreetAddress: '555 Xi Zang Road (Middle), Huangpu District Shanghai 200003 China',
      venueCityName: 'Shanghai',
      venueDesc: 'Shanghai Interop Dev Days 2015 will be held in the luxurious Shanghai Marriott Hotel City Centre. Located in the centre of Shanghai, Shanghai Marriott Hotel City Centre offers the best of Shanghai right outsides its doors.',
      accommodationHeading: 'Accommodations'
      })
  })
  .then(function () {
    return EventTravel.create({
      eventId: 3,
      aboveMapHeader: 'Santa Clara, CA',
      belowMapHeading: 'a completely different conference will be held in Santa Clara, CA',
      mapDesc: 'Jennifer. Whoa, whoa, Biff, what\'s that? Sam, quit fiddling with that thing and come in here and eat your dinner. Yeah, where does he live? Yoo.',
      mapImapHtml: '<div><iframe width="800" height="500" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=500&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe></div>',
      venueName: 'A Crater',
      venueImage: '',
      venueStreetAddress: '123 Space Ave.',
      venueCityName: '3rd Planet from the sun, The Universe',
      venueDesc: 'Ancient alien contend DNA manipulation the vedas ancient religions flying vessels, extraterrestrial spaceships clearly Chariot of the Gods Indian texts, Giorgio technology Easter island Ezekiel alien burmuta triangle SETI. Gods sun disc mercury Nazca lines astronaut pyramids, portal burmuta triangle clearly space brothers sightings, Sumerian texts UFO ancient alien theorists.',
      travelHeading: 'The Moon',
      travelDesc: 'Ancient alien extraterrestrial sanskrit Mahabharata vortex UFO aircraft Vymaanika-Shaastra, evidence ancient civilization sky people choral castle, clearly grey UFO Machu Picchu Easter island. Ancient religions sun disc mercury legendary times, I know it sounds crazy... Petroglyph contend clearly space time helicopter heiroglyph. Chariot of the Gods spaceships, Annunaki ancient religions.',
      travelImage: null,
      accommodationHeading: 'Accommodations',
      accommodationParagraph: 'Ancient alien sightings Easter island DNA manipulation, otherworldly visitors earth mound Indian texts, burmuta triangle ancient religions contend. Helicopter heiroglyph choral castle evidence targeted mutation otherworldly visitors ancient god, sanskrit cover up petroglyph ancient alien theorists Mahabharata, aircraft vortex the vedas pre-colonial aerodynamics ancient god. Flying vessels crystal skull, Mayan.',
      tipsDivHeading: 'Resistance is futile.',
      tipsDivParagraph: 'Sensors indicate human life forms 30 meters below the planet\'s surface. Stellar flares are increasing in magnitude and frequency. Set course for Rhomboid Dronegar 006, warp seven. There\'s no evidence of an advanced communication network.',
      eatAndDrinkHeading: 'Hello World Restaurant'
      })
  })