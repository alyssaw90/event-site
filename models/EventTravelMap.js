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

var EventTravelMap = module.exports = sql.define('EventTravelMap', {
	eventId: Sql.INTEGER,
	aboveMapHeader: Sql.TEXT,
  belowMapHeading: Sql.TEXT,
  mapDesc: Sql.TEXT,
  mapImapHtml: Sql.TEXT
})

EventTravelMap.sync({force: false})
 /* .then(function () {
    return EventTravelMap.create({
      eventId: 1,
      aboveMapHeader: 'Santa Clara, CA',
      belowMapHeading: 'The Storage Developer Conference will be held in Santa Clara, CA',
      mapDesc: 'Jennifer. Whoa, whoa, Biff, what\'s that? Sam, quit fiddling with that thing and come in here and eat your dinner. Yeah, where does he live? Yoo.',
      mapImapHtml: '<div><iframe width="800" height="500" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=500&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe></div>'
      })
  })
  .then(function () {
    return EventTravelMap.create({
      eventId: 2,
      aboveMapHeader: 'Santa Clara, CA',
      belowMapHeading: 'The Storage Developer Conference will be held in Santa Clara, CA',
      mapDesc: 'Jennifer. Whoa, whoa, Biff, what\'s that? Sam, quit fiddling with that thing and come in here and eat your dinner. Yeah, where does he live? Yoo.',
      mapImapHtml: '<div><iframe width="800" height="500" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=500&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe></div>'
      })
  })*/