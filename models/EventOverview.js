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

var EventOverview = module.exports = sql.define('EventOverview', {
	eventId: Sql.INTEGER,
	headingText: Sql.TEXT,
	paragraphText: Sql.TEXT
})

EventOverview.sync({force: false})
/*  .then(function () {
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
  })*/