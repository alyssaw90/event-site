'use strict';

var fs = require('fs');
var path = require('path');
var Sql = require('sequelize');
/*var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});

var randomTabImages = ['alt-slide-1.jpg', 'alt-slide-2.jpg', 'alt-slide-3.jpg', 'alt-slide-4.jpg', 'alt-slide-5.jpg', 'alt-slide-6.jpg'];
// var randomTabImages = ['alt-slide-1-large.jpg', 'alt-slide-2-large.jpg', 'alt-slide-3-large.jpg', 'alt-slide-4-large.jpg', 'alt-slide-5-large.jpg', 'alt-slide-6-large.jpg', 'alt-slide-7-large.jpg', 'alt-slide-8-large.jpg'];

var Event = module.exports = sql.define('Event', {
  eventName: Sql.STRING,
  eventRegistrationLink: Sql.STRING, //link to registrationfor event
  eventLocation: Sql.STRING,
  eventContinent: Sql.ENUM('North America', 'South America', 'Africa', 'Asia', 'Europe', 'Oceania'),
  eventStartDate: Sql.DATE, //the start date...
  eventEndDate: Sql.DATE, // the end date...
  eventHeaderImage: Sql.TEXT, //link to header image
  eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
  eventFuturePageText: Sql.TEXT, //slide up text for future events page
/*  eventSlideshowImage: {
    type: Sql.TEXT,
    unique: true,
    get: function () {
      return randomTabImages[Math.floor(Math.random() * randomTabImages.length)]
    }
  },*/ //image for front page slider
  homepageBulletOne: Sql.STRING,
  homepageBulletTwo: Sql.STRING,
  homepageBulletThree: Sql.STRING,
  eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: Sql.TEXT, //copy for Overview Tab
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
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
      var theEventLocation = this.getDataValue('eventLocation');
      var startDate = this.getDataValue('eventStartDate');
      var theUrl = theEventLocation.replace(/\W/g, '').toLowerCase() + '-' + startDate.getFullYear();
      return theEventLocation.replace(/\W/g, '').toLowerCase() + startDate.getFullYear();
    },
    eventSlideshowImage: function () {
      var idVal = this.getDataValue('id');
      var imgIndex = Math.floor(idVal / randomTabImages.length);
      return randomTabImages[idVal - imgIndex];
    }
  }
});


Event.sync({force: true})
.then(function () {
  return Event.create({
  eventName: 'Storage Developer Conference',
  eventRegistrationLink: 'http://www.example.com',
  eventStartDate: new Date('2010-01-01:00:01:00'),
  eventEndDate: new Date('2010-01-04:23:59:00'),
  eventLocation: 'Santa Clara',
  eventContinent: 'North America',
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg', 
  eventFuturePageImage: 'santa-clara-convention-center-2.jpg',
  eventFuturePageText: '<p>Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community.</p><p>Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.</p>',
  eventSlideshowImage: 'santa-clara-convention-center-2-homepage.jpg',
  homepageBulletOne: 'Persistent Memory',
  homepageBulletTwo: 'Object Drives',
  homepageBulletThree: 'SMR Drives',
  eventSponsorsTab: '<h2>2015 Sponsorship and Exhibitor Opportunities</h2><hr class="alt1" /><p>What a bounder fox hunting circus strongman arcu lip warmer Refined gentlemen robert winston east european, arcu lip warmer Fallen eyebrow clive dunn by jingo. east european what a bounder john cleese soup strainer robert winston hairy kiss. fox hunting timothy dalton Refined gentlemen what a bounder circus strongman, east european what a bounder robert winston circus strongman soup strainer hairy kiss. en time-warped cabbie what a bounder waiter lip warmer ding-dong clive dunn by jingo. timothy dalton louis xiii fox hunting arcu john cleese Refined gentlemen Fallen eyebrow? Devilish cad dolor sit amet cigars stiff upper lip funny walk, admiral funny walk cigars sportacus jolly good show david seaman devilish cad dolor sit amet stiff upper lip?</p><p>For more information on sponsorships or to find out why all our sponsors have the same logo, contact Yo Mama at <a href="mailto:yomama@example.com">yomama@example.com</a></p><hr class="alt1" /><h3>Platinum Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>A Company</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>Another Company</h4></div><hr class="alt1" /><h3>Gold Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>A Business</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>Another Business</h4></div><hr class="alt1" /><h3>Silver Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>Old Biz</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>New Biz</h4></div>', //copy for Sponsors Tab
  eventOverviewTab: '<h2>Storage Developer Conference</h2><h3>Boudin beef ribs</h3><p>Short loin bacon spare ribs biltong boudin, filet mignon shank brisket beef ribs swine bresaola meatloaf shoulder picanha. Cow bresaola bacon flank kevin ribeye pancetta short loin beef shankle doner tenderloin.</p><p>Tongue shank ham hock pork chop kevin, ribeye fatback turducken ground round filet mignon kielbasa spare ribs short loin jerky alcatra.</p><h4>2015 Agenda is Now Available</h4><p>Swine strip steak tongue picanha, chuck alcatra shankle jerky pancetta capicola pork andouille. Ham hock shank salami sirloin t-bone tail. Jowl ham flank, strip steak turducken ham hock salami pig landjaeger shank. </p><ul><li>First Subject</li><li>Second Subject</li><li>Third Subject</li></ul><p>View the full agenda here and start planning now which sessions you will attend. It won\'t be an easy choice!</p>', //copy for Overview Tab
  // travelTabMap: '<div><iframe width="800" height="400" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=400&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe><div style="margin: 12px 0 0 0;"><a target="_blank" href="http://www.bing.com/maps/?cp=37.355740~-121.954987&amp;sty=r&amp;lvl=12&amp;sp=point.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=map">View larger map</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=37.355740~-121.954987&amp;sty=r&amp;lvl=12&amp;rtp=~pos.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=dir">Get directions</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=q6sbtw4v3c8c&amp;sty=b&amp;lvl=18&amp;sp=point.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=be">View bird\'s eye</a></div></div>', //Bing Imap of location
  travelTabHeaderImage: 'santa-clara-convention-center.jpg',
  travelVenueTab: '<h2>Hello</h2><p>Ancient alien contend DNA manipulation the vedas ancient religions flying vessels, extraterrestrial spaceships clearly Chariot of the Gods Indian texts, Giorgio technology Easter island Ezekiel alien burmuta triangle SETI. Gods sun disc mercury Nazca lines astronaut pyramids, portal burmuta triangle clearly space brothers sightings, Sumerian texts UFO ancient alien theorists.</p>', //copy for travel venue sub tab
  travelTravelTab: '<h2>Travel Tab</h2><p>Ancient alien extraterrestrial sanskrit Mahabharata vortex UFO aircraft Vymaanika-Shaastra, evidence ancient civilization sky people choral castle, clearly grey UFO Machu Picchu Easter island. Ancient religions sun disc mercury legendary times, I know it sounds crazy... Petroglyph contend clearly space time helicopter heiroglyph. Chariot of the Gods spaceships, Annunaki ancient religions.</p>', //copy for trave travel sub tab
  travelAccomodationsTab: '<h2>Accommodations Tab</h2><p>Ancient alien sightings Easter island DNA manipulation, otherworldly visitors earth mound Indian texts, burmuta triangle ancient religions contend. Helicopter heiroglyph choral castle evidence targeted mutation otherworldly visitors ancient god, sanskrit cover up petroglyph ancient alien theorists Mahabharata, aircraft vortex the vedas pre-colonial aerodynamics ancient god. Flying vessels crystal skull, Mayan.</p>', //copy for travel accommodations sub tab
  travelTipsTab: '<h2>Tips Tab</h2><p>We need to neutralize the homing signal. Each unit has total environmental control, gravity, temperature, atmosphere, light, in a protective field. Sensors show energy readings in your area. We had a forced chamber explosion in the resonator coil. Field strength has increased by 3,000 percent.</p>', //copy for travel Tips and Tricks sub tab
  travelEatDrinkTab: '<h2>Eat & Drink</h2><p>Do cupidatat aliquip ribeye meatball beef ribs. Cillum meatloaf beef, filet mignon ham hock lorem culpa. Sirloin laboris dolore shank, pork belly aliquip cillum. Excepteur lorem beef jerky doner.</p>', //copy for travel eat and drink sub tab
  eventMediaTab: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.', //copy for media tab
  });
})
.then(function () {
  return Event.create({
  eventName: 'Shanghai Interop Dev Days 2015',
  eventRegistrationLink: 'http://www.example.com', //link to registrationfor event
  eventLocation: 'Shanghai',
  eventContinent: 'Asia',
  eventStartDate: new Date('2026-10-21T08:00:00'), //the start date...
  eventEndDate: new Date('2026-10-22T08:00:00'), // the end date...
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg', 
  eventFuturePageImage: 'shanghai-2015-future-page.jpg', //image to appear on event slide on homepage
  eventFuturePageText: '<p>Shanghai was the first city to host Interop Dev Days and they continue to be one of the most important hubs of innovation with Microsoft products.</p><p>Dev Days focuses on Microsoft development opportunities for professional, independent, and student developers. Join us and start innovating with Microsoft!</p>', //slide up text for future events page
  // eventSlideshowImage: 'shanghai-2015-slideshow.jpg', //image for front page slider
  homepageBulletOne: 'O365 APIs',
  homepageBulletTwo: 'Word, Excel, Outlook, & PowerPoint Add-ins',
  homepageBulletThree: 'Exchange and SharePoint protocols',
  // eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: '<h2>Shanghai Interop Dev Days 2015</h2><p>Shanghai was the first city to host Interop Dev Days. Different from the traditional Plugfest, Dev Days focuses on Microsoft development opportunities for professional, independent, and student developers. Interop Dev Days highlights the opportunities of developing with Office 365. In addition to familiar topics such as O365 development and Open Specifications, OData played a crucial role in Shanghai’s Dev Days, illustrating the value in creating and using interoperable RESTful APIs. The event offered a full range of presentations, live demonstrations, and Q&A sessions. Attendees also received one-on-one assistance and a free Microsoft developer account.</p><p>The combination of O365 development, OData, and the traditional protocol implementation allowed for Interop Dev Days to reach a new audience, introduce fresh content, and explore a different event structure. Sessions included step-by-step instructions for setting up an O365 developer account, an interactive Office Add-in brainstorm session, and an Office dev hack session. Shanghai Interop Dev Days gave attendees a well-rounded experience from brainstorming, to building, to completing a product. Engaged, enthusiastic attendees actively developed with Office 365, created tangible results, and built stronger relationships with Microsoft.</p>', 
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  // travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
  // travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
  // travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
  // travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
  // travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
  // travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
  // eventMediaTab: Sql.TEXT //copy for media tab
  });
})
.then(function () {
  return Event.create({
  eventName: 'Paris Dev Days 2016',
  eventRegistrationLink: 'http://www.awwards.com', //link to registrationfor event
  eventLocation: 'Paris',
  eventContinent: 'Europe',
  eventStartDate: new Date('2016-05-16:00:00:01'), //the start date...
  eventEndDate: new Date('2016-05-18:23:59:00'), // the end date...
  eventHeaderImage: 'paris-logo-2016.jpg', //link to header image
  // eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
  // eventFuturePageText: Sql.TEXT, //slide up text for future events page
  // eventSlideshowImage: Sql.TEXT, //image for front page slider
  // homepageBulletOne: Sql.STRING,
  // homepageBulletTwo: Sql.STRING,
  // homepageBulletThree: Sql.STRING,
  // eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: '<h2>Paris Dev Days 2016</h2><p>As part of the Dev Days series, Microsoft Office and Data Platform Interoperability introduce Paris Dev Days from May 16-18, 2016. Similar to Shanghai and Taipei, Paris Dev Days will showcase Microsoft Office 365 developer opportunities, Data Platform, and interoperability.</p><br /><ul><li>Discover the potential of connecting to Office 365 services by building and selling apps that extend the most widely used productivity platform on the planet.</li> <li>Learn what’s new in Data Platform including SQL Server, PowerBI, Cortana Analytics, machine learning, big data stores, and data analytics.  </li><li>Experience Microsoft’s commitment to interoperability while learning about protocol documentation, available protocol tools, and customer engagement opportunities that are available to implementers and developers looking to connect with Microsoft clients and servers. </li></ul><br /><p>Attendees can look forward to presentations from subject matter experts, interactive developer sessions, hackathons, and one-on-one collaborations with Microsoft engineers. Paris Dev Days will include evening mixers and social hour with other attendees and Microsoft engineers. Paris 2016 will be launched in February 2016. If you would like to reserve your seat early, please email <a href="mailto:plugfests@microsoft.com" >plugfests@microsoft.com</a>.</p><br /><p>*Content is subject to change</p><br />', //copy for Overview Tab
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  // travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
  // travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
  // travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
  // travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
  // travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
  // travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
  // eventMediaTab: Sql.TEXT //copy for media tab
  });
})
.then(function () {
  return Event.create({
    eventName: 'Taipei Interop Dev Days 2016',
    eventStartDate: new Date('2016-04-20:08:00:00'),
    eventEndDate: new Date('2016-04-21:23:00:00'),
    eventLocation: 'Taipei',
    eventContinent: 'Asia',
    eventHeaderImage: 'taipei-logo-2016.jpg',
    // eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
    // eventFuturePageText: Sql.TEXT, //slide up text for future events page
    // eventSlideshowImage: 'taipei-sample-slideshow-img.jpg', //image for front page slider
    homepageBulletOne: 'SQL Serve',
    homepageBulletTwo: 'PowerBI',
    homepageBulletThree: 'Big Data Stores, and Data Analytics',
    // eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
    eventOverviewTab: '<h2>Taipei Interop Dev Days 2016</h2><p>Join Microsoft Office and Data Platform Interoperability teams April 20-21, 2016 for their 4th event in Taipei, Taiwan. Taipei 2016 will focus on Microsoft Office 365 developer opportunities, Data Platform, and interoperability.</p><br /><ul><li>Discover the potential of connecting to Office 365 services by building and selling apps that extend the most widely used productivity platform on the planet.</li><li>Learn what’s new in Data Platform including SQL Server, PowerBI, Cortana Analytics, machine learning, big data stores, and data analytics.</li><li>Experience Microsoft’s commitment to interoperability while learning about protocol documentation, available protocol tools, and customer engagement opportunities that are available to implementers and developers looking to connect with Microsoft clients and servers.</li></ul><br /><p>Attendees can look forward to presentations from subject matter experts, interactive developer sessions, hackathons, and one-on-one collaboration with Microsoft engineers. Taipei 2016 will be launched in January 2016 when more details and event registration will be released. If you would like to reserve your seat early, please email <a href="mailto:plugfests@microsoft.com" >plugfests@microsoft.com</a>.</p><br /><p>*Content is subject to change</p>', //copy for Overview Tab
    // travelTabMap: Sql.TEXT, //Bing Imap of location
    // travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
    // travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
    // travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
    // travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
    // travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
    // travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
    // eventMediaTab: Sql.TEXT //copy for media tab
  })
})
.then(function () {
  return Event.create({
  eventName: 'Redmond Plugfest 2016',
  // eventRegistrationLink: Sql.STRING, //link to registrationfor event
  eventLocation: 'Redmond',
  eventContinent: 'North America',
  eventStartDate: new Date('2016-06-20:00:01:00'), //the start date...
  eventEndDate: new Date('2016-06-24:23:59:00'), // the end date...
  eventHeaderImage: 'redmond-logo-2016.jpg', //link to header image
  // eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
  // eventFuturePageText: Sql.TEXT, //slide up text for future events page
  // eventSlideshowImage: Sql.TEXT, //image for front page slider
  // homepageBulletOne: Sql.STRING,
  // homepageBulletTwo: Sql.STRING,
  // homepageBulletThree: Sql.STRING,
  // eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: '<p>The Microsoft Interoperability team is hosting the 7th annual Redmond Plugfest from June 20-24, 2016. The Redmond Plugfest will feature content from the very latest developments in Office, SharePoint, Exchange, File Formats and Data Platform.  Attendees of the Redmond Plugfest can participate in protocol testing, engage directly with the Microsoft Interoperability support engineers and network with other professionals from all over the world! Microsoft product engineers will be on site throughout the event to discuss interoperability topics and to help answer questions.</p><br /><p>If you would like to reserve your seat early, please email plugfests@microsoft.com.</p><br /><p>*Content is subject to change</p>', //copy for Overview Tab
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  // travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
  // travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
  // travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
  // travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
  // travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
  // travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
  // eventMediaTab: Sql.TEXT //copy for media tab
  })
})
.then(function () {
  return Event.create({
  eventName: 'Storage Developer Conference 2',
  eventRegistrationLink: 'http://www.example.com',
  eventStartDate: new Date('2014-01-01:00:01:00'),
  eventEndDate: new Date('2014-01-04:23:59:00'),
  eventLocation: 'Santa Clara, CA',
  eventContinent: 'North America',
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg', 
  eventFuturePageImage: 'santa-clara-convention-center-2.jpg',
  eventFuturePageText: '<p>Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community.</p><p>Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.</p>',
  eventSlideshowImage: 'santa-clara-convention-center-2-homepage.jpg',
  homepageBulletOne: 'Persistent Memory',
  homepageBulletTwo: 'Object Drives',
  homepageBulletThree: 'SMR Drives',
  eventSponsorsTab: '<h2>2015 Sponsorship and Exhibitor Opportunities</h2><hr class="alt1" /><p>What a bounder fox hunting circus strongman arcu lip warmer Refined gentlemen robert winston east european, arcu lip warmer Fallen eyebrow clive dunn by jingo. east european what a bounder john cleese soup strainer robert winston hairy kiss. fox hunting timothy dalton Refined gentlemen what a bounder circus strongman, east european what a bounder robert winston circus strongman soup strainer hairy kiss. en time-warped cabbie what a bounder waiter lip warmer ding-dong clive dunn by jingo. timothy dalton louis xiii fox hunting arcu john cleese Refined gentlemen Fallen eyebrow? Devilish cad dolor sit amet cigars stiff upper lip funny walk, admiral funny walk cigars sportacus jolly good show david seaman devilish cad dolor sit amet stiff upper lip?</p><p>For more information on sponsorships or to find out why all our sponsors have the same logo, contact Yo Mama at <a href="mailto:yomama@example.com">yomama@example.com</a></p><hr class="alt1" /><h3>Platinum Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>A Company</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>Another Company</h4></div><hr class="alt1" /><h3>Gold Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>A Business</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>Another Business</h4></div><hr class="alt1" /><h3>Silver Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>Old Biz</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>New Biz</h4></div>', //copy for Sponsors Tab
  eventOverviewTab: '<h2>Storage Developer Conference</h2><h3>Boudin beef ribs</h3><p>Short loin bacon spare ribs biltong boudin, filet mignon shank brisket beef ribs swine bresaola meatloaf shoulder picanha. Cow bresaola bacon flank kevin ribeye pancetta short loin beef shankle doner tenderloin.</p><p>Tongue shank ham hock pork chop kevin, ribeye fatback turducken ground round filet mignon kielbasa spare ribs short loin jerky alcatra.</p><h4>2015 Agenda is Now Available</h4><p>Swine strip steak tongue picanha, chuck alcatra shankle jerky pancetta capicola pork andouille. Ham hock shank salami sirloin t-bone tail. Jowl ham flank, strip steak turducken ham hock salami pig landjaeger shank. </p><ul><li>First Subject</li><li>Second Subject</li><li>Third Subject</li></ul><p>View the full agenda here and start planning now which sessions you will attend. It won\'t be an easy choice!</p>', //copy for Overview Tab
  // travelTabMap: '<div><iframe width="800" height="400" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=400&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe><div style="margin: 12px 0 0 0;"><a target="_blank" href="http://www.bing.com/maps/?cp=37.355740~-121.954987&amp;sty=r&amp;lvl=12&amp;sp=point.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=map">View larger map</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=37.355740~-121.954987&amp;sty=r&amp;lvl=12&amp;rtp=~pos.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=dir">Get directions</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=q6sbtw4v3c8c&amp;sty=b&amp;lvl=18&amp;sp=point.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=be">View bird\'s eye</a></div></div>', //Bing Imap of location
  travelTabHeaderImage: 'santa-clara-convention-center.jpg',
  travelVenueTab: '<h2>Hello</h2><p>Ancient alien contend DNA manipulation the vedas ancient religions flying vessels, extraterrestrial spaceships clearly Chariot of the Gods Indian texts, Giorgio technology Easter island Ezekiel alien burmuta triangle SETI. Gods sun disc mercury Nazca lines astronaut pyramids, portal burmuta triangle clearly space brothers sightings, Sumerian texts UFO ancient alien theorists.</p>', //copy for travel venue sub tab
  travelTravelTab: '<h2>Travel Tab</h2><p>Ancient alien extraterrestrial sanskrit Mahabharata vortex UFO aircraft Vymaanika-Shaastra, evidence ancient civilization sky people choral castle, clearly grey UFO Machu Picchu Easter island. Ancient religions sun disc mercury legendary times, I know it sounds crazy... Petroglyph contend clearly space time helicopter heiroglyph. Chariot of the Gods spaceships, Annunaki ancient religions.</p>', //copy for trave travel sub tab
  travelAccomodationsTab: '<h2>Accommodations Tab</h2><p>Ancient alien sightings Easter island DNA manipulation, otherworldly visitors earth mound Indian texts, burmuta triangle ancient religions contend. Helicopter heiroglyph choral castle evidence targeted mutation otherworldly visitors ancient god, sanskrit cover up petroglyph ancient alien theorists Mahabharata, aircraft vortex the vedas pre-colonial aerodynamics ancient god. Flying vessels crystal skull, Mayan.</p>', //copy for travel accommodations sub tab
  travelTipsTab: '<h2>Tips Tab</h2><p>We need to neutralize the homing signal. Each unit has total environmental control, gravity, temperature, atmosphere, light, in a protective field. Sensors show energy readings in your area. We had a forced chamber explosion in the resonator coil. Field strength has increased by 3,000 percent.</p>', //copy for travel Tips and Tricks sub tab
  travelEatDrinkTab: '<h2>Eat & Drink</h2><p>Do cupidatat aliquip ribeye meatball beef ribs. Cillum meatloaf beef, filet mignon ham hock lorem culpa. Sirloin laboris dolore shank, pork belly aliquip cillum. Excepteur lorem beef jerky doner.</p>', //copy for travel eat and drink sub tab
  eventMediaTab: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.' //copy for media tab
  });
})
