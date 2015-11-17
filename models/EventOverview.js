/*'use strict';

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

var EventOverview = module.exports = sql.define('EventOverview', {
	eventId: Sql.INTEGER,
	headingText: Sql.TEXT,
	paragraphText: Sql.TEXT
})

EventOverview.sync({force: true})
  .then(function () {
    return EventOverview.create({
      eventId: 1,
      headingText: 'Cheese Ipsum this Time!',
      paragraphText: 'Babybel squirty cheese rubber cheese. Edam lancashire cut the cheese everyone loves cauliflower cheese blue castello jarlsberg stinking bishop. Croque monsieur halloumi mozzarella dolcelatte red leicester cheese slices parmesan emmental. Monterey jack.'
    })
  })
  .then(function () {
    return EventOverview.create({
      eventId: 1,
      headingText: 'Because it is almost lunch',
      paragraphText: 'Cauliflower cheese smelly cheese rubber cheese. Babybel hard cheese cottage cheese rubber cheese babybel croque monsieur manchego edam. Halloumi cheese slices babybel emmental boursin bocconcini bavarian bergkase halloumi. Croque monsieur caerphilly st. agur blue cheese cheese slices'
    })
  })
  .then(function () {
    return EventOverview.create({
      eventId: 2,
      headingText: '',
      paragraphText: 'Shanghai was the first city to host Interop Dev Days. Different from the traditional Plugfest, Dev Days focuses on Microsoft development opportunities for professional, independent, and student developers. Interop Dev Days highlights the opportunities of developing with Office 365. In addition to familiar topics such as O365 development and Open Specifications, OData played a crucial role in Shanghai’s Dev Days, illustrating the value in creating and using interoperable RESTful APIs. The event offered a full range of presentations, live demonstrations, and Q&A sessions. Attendees also received one-on-one assistance and a free Microsoft developer account.<br /><br />The combination of O365 development, OData, and the traditional protocol implementation allowed for Interop Dev Days to reach a new audience, introduce fresh content, and explore a different event structure. Sessions included step-by-step instructions for setting up an O365 developer account, an interactive Office Add-in brainstorm session, and an Office dev hack session. Shanghai Interop Dev Days gave attendees a well-rounded experience from brainstorming, to building, to completing a product. Engaged, enthusiastic attendees actively developed with Office 365, created tangible results, and built stronger relationships with Microsoft.'
    })
  })
  .then(function () {
    return EventOverview.create({
      eventId: 3,
      headingText: 'Cheese Ipsum this Time!',
      paragraphText: 'Babybel squirty cheese rubber cheese. Edam lancashire cut the cheese everyone loves cauliflower cheese blue castello jarlsberg stinking bishop. Croque monsieur halloumi mozzarella dolcelatte red leicester cheese slices parmesan emmental. Monterey jack.'
    })
  })
  .then(function () {
    return EventOverview.create({
      eventId: 3,
      headingText: 'Because it is almost lunch',
      paragraphText: 'Cauliflower cheese smelly cheese rubber cheese. Babybel hard cheese cottage cheese rubber cheese babybel croque monsieur manchego edam. Halloumi cheese slices babybel emmental boursin bocconcini bavarian bergkase halloumi. Croque monsieur caerphilly st. agur blue cheese cheese slices'
    })
  })*/