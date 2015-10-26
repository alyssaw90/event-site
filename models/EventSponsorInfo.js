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

var EventSponsorInfo = module.exports = sql.define('EventSponsorInfo', {
	eventId: Sql.INTEGER,
	sponsorshipHeading: Sql.TEXT,
	sponsorshipParagraph: Sql.TEXT
})

EventSponsorInfo.sync({force: false})
/*  .then(function () {
    return EventSponsorInfo.create({
      eventId: 1,
      sponsorshipHeading: 'Eat and than sleep on your face!',
      sponsorshipParagraph: 'Cat ipsum dolor sit amet, sleep nap. Hiss at vacuum cleaner always hungry and eat a plant, kill a hand. Leave fur on owners clothes refuse to leave cardboard box so purr while eating or scratch the furniture lick arm hair. Give attitude destroy couch, or scamper for unwrap toilet paper i like big cats and i can not lie and sit in box, for meowing non stop for food. Chase red laser dot stare at the wall, play with food and get confused by dust mark territory scamper throwup on your pillow unwrap toilet paper nap all day. Use lap as chair thug cat . Meowing non stop for food. Pelt around the house and up and down stairs chasing phantoms stare at ceiling, for destroy couch meowzer!. I am the best.'
    })
  })*/