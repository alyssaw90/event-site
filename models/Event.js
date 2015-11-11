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
  eventBackgroundImage: Sql.TEXT, //image to appear on event slide on homepage
  eventSlideUpText: Sql.TEXT, //slide up text for future events page
  sponsorsHeading: Sql.TEXT, //heading for sponsors section
  sponsorsParagraph: Sql.TEXT, // paragraph below heading on sponsors section
  eventSliderImage: Sql.TEXT, //image for front page slider
  homepageBulletOne: Sql.STRING,
  homepageBulletTwo: Sql.STRING,
  homepageBulletThree: Sql.STRING
},
{
  getterMethods   : {
    eventUrl: function () {
      return this.eventName.replace(/\W/g, '').toLowerCase() + '-' + this.eventStartDate.getFullYear();
    }
  }
});


Event.sync({force: true})
.then(function () {
  return Event.create({
  eventName: 'Storage Developer Conference',
  eventStartDate: new Date(2020, 1, 1),
  eventEndDate: new Date(2020, 1, 15),
  eventLocation: 'Santa Clara, CA',
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg', 
  eventBackgroundImage: '', 
  eventSlideUpText: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.',
  sponsorsHeading: 'These are our sponsors',
  sponsorsParagraph: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby.',
  homepageBulletOne: 'Persistent Memory',
  homepageBulletTwo: 'Object Drives',
  homepageBulletThree: 'SMR Drives'
  });
})
.then(function () {
  return Event.create({
  eventName: 'Shanghai Interop Dev Days 2015',
  eventStartDate: new Date('2026-10-21T08:00:00'),
  eventEndDate: new Date('2026-10-22T08:00:00'),
  eventLocation: 'Shanghai, China',
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg', 
  eventSlideUpText: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.',
  homepageBulletOne: 'O365 APIs',
  homepageBulletTwo: 'Word, Excel, Outlook, & PowerPoint Add-ins',
  homepageBulletThree: 'Exchange and SharePoint protocols'
  });
})
.then(function () {
  return Event.create({
  eventName: 'Europe Protocols Plugfest',
  eventStartDate: new Date(2025, 1, 1),
  eventEndDate: new Date(2025, 1, 4),
  eventLocation: 'Paris, France',
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg', 
  eventBackgroundImage: '', 
  eventSlideUpText: 'Zombie ipsum reversus ab viral inferno',
  sponsorsHeading: 'Why do all these companies have the same logo?',
  sponsorsParagraph: 'Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.',
  homepageBulletOne: 'Romance',
  homepageBulletTwo: 'Style',
  homepageBulletThree: 'General Frenchiness'
  });
})


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


