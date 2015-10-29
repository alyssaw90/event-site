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
  accommodationParagraph: Sql.TEXT
})

EventTravel.sync({force: false})
/*  .then(function () {
    return EventTravel.create({
      eventId: 1,
      aboveMapHeader: 'Santa Clara, CA',
      belowMapHeading: 'The Storage Developer Conference will be held in Santa Clara, CA',
      mapDesc: 'Jennifer. Whoa, whoa, Biff, what\'s that? Sam, quit fiddling with that thing and come in here and eat your dinner. Yeah, where does he live? Yoo.',
      mapImapHtml: '<div><iframe width="800" height="500" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=500&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe></div>'
      })
  })
  .then(function () {
    return EventTravel.create({
      eventId: 2,
      aboveMapHeader: 'Paris, France',
      belowMapHeading: 'A Conference in Paris',
      mapDesc: 'Yeah, well, how about my homework, McFly? Alright, alright, okay McFly, get a grip on yourself. It\'s all a dream. Just a very intense dream.',
      mapImapHtml: '<div><iframe width="800" height="500" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=48.856930~2.341200&amp;lvl=9&amp;w=800&amp;h=500&amp;sty=r&amp;typ=d&amp;pp=Paris%2C%20France~~48.856930~2.341200&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe><div style="margin: 12px 0 0 0;"><a target="_blank" href="http://www.bing.com/maps/?cp=48.856930~2.341200&amp;sty=r&amp;lvl=9&amp;sp=point.48.856930_2.341200_Paris%2C%20France_&amp;mm_embed=map">View larger map</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=48.856930~2.341200&amp;sty=r&amp;lvl=9&amp;rtp=~pos.48.856930_2.341200_Paris%2C%20France_&amp;mm_embed=dir">Get directions</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=s48j5jh5vkpz&amp;sty=b&amp;lvl=18&amp;sp=point.48.856930_2.341200_Paris%2C%20France_&amp;mm_embed=be">View bird\'s eye</a></div></div>'
      })
  })*/