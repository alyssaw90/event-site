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
  eventRegistrationLink: Sql.STRING, //link to registrationfor event
  eventLocation: Sql.STRING,
  eventStartDate: Sql.DATE, //the start date...
  eventEndDate: Sql.DATE, // the end date...
  eventHeaderImage: Sql.TEXT, //link to header image
  eventBackgroundImage: Sql.TEXT, //image to appear on event slide on homepage
  eventSlideUpText: Sql.TEXT, //slide up text for future events page
  // sponsorsHeading: Sql.TEXT, //heading for sponsors section
  // sponsorsParagraph: Sql.TEXT, // paragraph below heading on sponsors section
  eventSliderImage: Sql.TEXT, //image for front page slider
  homepageBulletOne: Sql.STRING,
  homepageBulletTwo: Sql.STRING,
  homepageBulletThree: Sql.STRING,
  eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: Sql.TEXT, //copy for Overview Tab
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
  travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
  travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
  travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
  travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
  eventMediaTab: Sql.TEXT //copy for media tab
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
  eventRegistrationLink: 'http://www.example.com',
  eventStartDate: new Date(2020, 1, 1),
  eventEndDate: new Date(2020, 1, 15),
  eventLocation: 'Santa Clara, CA',
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg', 
  eventSlideUpText: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.',
  homepageBulletOne: 'Persistent Memory',
  homepageBulletTwo: 'Object Drives',
  homepageBulletThree: 'SMR Drives',
  eventSponsorsTab: '<h2>2015 Sponsorship and Exhibitor Opportunities</h2><hr class="alt1" /><p>What a bounder fox hunting circus strongman arcu lip warmer Refined gentlemen robert winston east european, arcu lip warmer Fallen eyebrow clive dunn by jingo. east european what a bounder john cleese soup strainer robert winston hairy kiss. fox hunting timothy dalton Refined gentlemen what a bounder circus strongman, east european what a bounder robert winston circus strongman soup strainer hairy kiss. en time-warped cabbie what a bounder waiter lip warmer ding-dong clive dunn by jingo. timothy dalton louis xiii fox hunting arcu john cleese Refined gentlemen Fallen eyebrow? Devilish cad dolor sit amet cigars stiff upper lip funny walk, admiral funny walk cigars sportacus jolly good show david seaman devilish cad dolor sit amet stiff upper lip?</p><p>For more information on sponsorships or to find out why all our sponsors have the same logo, contact Yo Mama at <a href="mailto:yomama@example.com">yomama@example.com</a></p><hr class="alt1" /><h3>Platinum Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>A Company</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>Another Company</h4></div><hr class="alt1" /><h3>Gold Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>A Business</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>Another Business</h4></div><hr class="alt1" /><h3>Silver Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>Old Biz</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>New Biz</h4></div>', //copy for Sponsors Tab
  eventOverviewTab: '<h2>Storage Developer Conference</h2><h3>Boudin beef ribs</h3><p>Short loin bacon spare ribs biltong boudin, filet mignon shank brisket beef ribs swine bresaola meatloaf shoulder picanha. Cow bresaola bacon flank kevin ribeye pancetta short loin beef shankle doner tenderloin.</p><p>Tongue shank ham hock pork chop kevin, ribeye fatback turducken ground round filet mignon kielbasa spare ribs short loin jerky alcatra.</p><h4>2015 Agenda is Now Available</h4><p>Swine strip steak tongue picanha, chuck alcatra shankle jerky pancetta capicola pork andouille. Ham hock shank salami sirloin t-bone tail. Jowl ham flank, strip steak turducken ham hock salami pig landjaeger shank. </p><ul><li>First Subject</li><li>Second Subject</li><li>Third Subject</li></ul><p>View the full agenda here and start planning now which sessions you will attend. It won\'t be an easy choice!</p>', //copy for Overview Tab
  // travelTabMap: '<div><iframe width="800" height="400" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=400&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe><div style="margin: 12px 0 0 0;"><a target="_blank" href="http://www.bing.com/maps/?cp=37.355740~-121.954987&amp;sty=r&amp;lvl=12&amp;sp=point.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=map">View larger map</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=37.355740~-121.954987&amp;sty=r&amp;lvl=12&amp;rtp=~pos.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=dir">Get directions</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=q6sbtw4v3c8c&amp;sty=b&amp;lvl=18&amp;sp=point.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=be">View bird\'s eye</a></div></div>', //Bing Imap of location
  travelVenueTab: '<h2>Hello</h2><p>Ancient alien contend DNA manipulation the vedas ancient religions flying vessels, extraterrestrial spaceships clearly Chariot of the Gods Indian texts, Giorgio technology Easter island Ezekiel alien burmuta triangle SETI. Gods sun disc mercury Nazca lines astronaut pyramids, portal burmuta triangle clearly space brothers sightings, Sumerian texts UFO ancient alien theorists.</p>', //copy for travel venue sub tab
  // travelTravelTab: '<h2>Travel Tab</h2><p>Ancient alien extraterrestrial sanskrit Mahabharata vortex UFO aircraft Vymaanika-Shaastra, evidence ancient civilization sky people choral castle, clearly grey UFO Machu Picchu Easter island. Ancient religions sun disc mercury legendary times, I know it sounds crazy... Petroglyph contend clearly space time helicopter heiroglyph. Chariot of the Gods spaceships, Annunaki ancient religions.</p>', //copy for trave travel sub tab
  // travelAccomodationsTab: '<h2>Accommodations Tab</h2><p>Ancient alien sightings Easter island DNA manipulation, otherworldly visitors earth mound Indian texts, burmuta triangle ancient religions contend. Helicopter heiroglyph choral castle evidence targeted mutation otherworldly visitors ancient god, sanskrit cover up petroglyph ancient alien theorists Mahabharata, aircraft vortex the vedas pre-colonial aerodynamics ancient god. Flying vessels crystal skull, Mayan.</p>', //copy for travel accommodations sub tab
  // travelTipsTab: '<h2>Tips Tab</h2><p>We need to neutralize the homing signal. Each unit has total environmental control, gravity, temperature, atmosphere, light, in a protective field. Sensors show energy readings in your area. We had a forced chamber explosion in the resonator coil. Field strength has increased by 3,000 percent.</p>', //copy for travel Tips and Tricks sub tab
  // travelEatDrinkTab: '<h2>Eat & Drink</h2><p>Do cupidatat aliquip ribeye meatball beef ribs. Cillum meatloaf beef, filet mignon ham hock lorem culpa. Sirloin laboris dolore shank, pork belly aliquip cillum. Excepteur lorem beef jerky doner.</p>', //copy for travel eat and drink sub tab
  eventMediaTab: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.' //copy for media tab
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
.then(function () {
  return Event.create({
    eventName: 'Taipei Interop Dev Days 2016',
    eventStartDate: new Date('April 20, 2016 01:00:00'),
    eventEndDate: new Date('April 21, 2016 11:59:00'),
    eventLocation: 'Taipei, Taiwan',
    eventHeaderImage: 'taipei-logo-2016.jpg'
  })
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


