'use strict';

var fs = require('fs');
var path = require('path');
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

var Event = module.exports = sql.define('Event', {
  eventName: Sql.STRING,
  eventLocation: Sql.STRING,
  eventStartDate: Sql.DATE, //the start date...
  eventEndDate: Sql.DATE, // the end date...
  eventHeaderImage: Sql.TEXT, //bas64 string of header image
  eventBackgroundImage: Sql.TEXT, //image to appear on event block on future events page
  eventSlideUpText: Sql.TEXT, //slide up text for future events page
  sponsorsHeading: Sql.TEXT, //heading for sponsors section
  sponsorsParagraph: Sql.TEXT // paragraph below heading on sponsors section
},
{
  getterMethods   : {
    eventUrl: function () {
      return this.eventName.replace(/\W/g, '').toLowerCase() + '-' + this.eventStartDate.getFullYear();
    }
  }
});


Event.sync({force: false})
/*.then(function () {
  fs.readFile(path.join(__dirname, '../img/SDC15_WebHeader3_999x188.png'), function (err, data) {
    var headerImage = data.toString('base64');
    fs.readFile(path.join(__dirname, '../img/santa-clara-convention-center-2.jpg'), function (err, data2) {
      var backgroundImage = data2.toString('base64');
      return Event.create({
      eventName: 'Storage Developer Conference',
      eventStartDate: new Date(2020, 1, 1),
      eventLocation: 'Santa Clara, CA',
      eventHeaderImage: headerImage, 
      eventBackgroundImage: backgroundImage, 
      eventSlideUpText: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.',
      sponsorsHeading: 'These are our sponsors',
      sponsorsParagraph: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby.'
      });
    });
  });
})
.then(function () {
  fs.readFile(path.join(__dirname, '../img/SDC15_WebHeader3_999x188.png'), function (err, data) {
    var headerImage = data.toString('base64');
    fs.readFile(path.join(__dirname, '../img/santa-clara-convention-center-2.jpg'), function (err, data2) {
      var backgroundImage = data2.toString('base64');
      return Event.create({
      eventName: 'A completely different conference',
      eventStartDate: new Date(2020, 1, 1),
      eventLocation: 'Hades',
      eventHeaderImage: headerImage, 
      eventBackgroundImage: backgroundImage, 
      eventSlideUpText: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.',
      sponsorsHeading: 'These are an entirely differrent set of sponsors',
      sponsorsParagraph: 'De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor fornix dictum mauris. Hi brains mindless mortuis limbic cortex soulless creaturas optic nerve, imo evil braaiinns stalking monstra hypothalamus adventus resi hippocampus dentevil vultus brain comedat cerebella pitiutary gland viventium.'
      });
    });
  });
});*/


/*var headerImage = fs.readFileSync(path.join(__dirname, '../img/SDC15_WebHeader3_999x188.png')).toString('base64');
var backgroundImage = fs.readFileSync(path.join(__dirname, '../img/santa-clara-convention-center-2.jpg')).toString('base64');
Event.sync({force: false})
  .then(function () {
    return Event.create({
      eventName: 'Storage Developer Conference',
      eventStartDate: new Date(2013, 09, 30),
      eventLocation: 'Santa Clara, CA',
      eventHeaderImage: headerImage, 
      eventBackgroundImage: backgroundImage, 
      eventSlideUpText: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.'

    })
  })*/


