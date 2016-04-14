'use strict';
/*global interests */
/*global ContactsSuggestedCity */

// require('dotenv').load();
var Contact = require('../models/Contact');
var Event = require('../models/Event');
var EventTab = require('../models/EventTab');
// var User = require('../models/User');
var EventImage = require('../models/EventImage');
var User = require('../models/User');
var fs = require('fs');
var clc = require('cli-color');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var eatAuth = require('../scripts/eat_auth')(process.env.SECRET_KEY);
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
/*var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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
});*/

var sql = new Sql(process.env.DB_DEV_NAME, process.env.DB_DEV_USER, process.env.DB_DEV_PASS, {
  host: process.env.DB_DEV_HOST,
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

sql.authenticate()
  .then(function (err) {
    if (err) {
      console.log(clc.xterm(202)('Unable to connect to the database with db router: '), err);
    } else {
      console.log(clc.xterm(202)('Connection has been established successfully with db router.'));
    }
  });

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var continentColors = {'North America': 'ffb900', 'South America': '107c10', 'Africa': 'e81123', 'Asia': '0078d7', 'Europe': '5c2d91', 'Oceania': 'b4009e'};

function shuffle (arr) {
  var currentIndex = arr.length, tempVal, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tempVal = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tempVal;
  }

  return arr;
}

module.exports = function (router) {
  router.use(bodyparser.json());
  router.use(bodyparser.urlencoded({
    extended: true
  }));
  router.use(cookieParser());

  /*Begin basic view routes*/
  router.route('/')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });

  router.route('/about')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/about.html'));
  });

  router.route('/past-events')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/past-events.html'));
  });

  //route to return html for meet the team page
  router.route('/meet-the-team')
  .get(function(req, res) {
    //sync with the database and search for all speakers where showOnMeetTheTeamPage is true
    sql.sync()
    .then(function() {
      return Contact.findAll({
        where: {
          showOnMeetTheTeamPage: true
        }
      })
    })
    .then(function(speakers) {
      var meetTheTeamSpeakersArr = [];
      var meetTheTeamSpeakersHtml = '<main class="grid white-bg main-page-content the-team-section">';
      //loop over the returned speakers and splice them into an array using their position number minus one as the index
      for (var key in speakers) {
        meetTheTeamSpeakersArr.splice(speakers[key].meetTheTeamPageOrder - 1, 0, speakers[key]) 
      }
      //create the string of html to add to the page
      for (var i = 0, j = meetTheTeamSpeakersArr.length; i < j; i++) {
        meetTheTeamSpeakersHtml += '<section class="col_12 internetExplorer" id="' + meetTheTeamSpeakersArr[i].divId + '"><h4>' + meetTheTeamSpeakersArr[i].firstName + ' ' + meetTheTeamSpeakersArr[i].lastName + '</h4><h5>'+ meetTheTeamSpeakersArr[i].msTeamTitle + '</h5><p><img class="pull-left" src="../uploads/' + meetTheTeamSpeakersArr[i].headShot + '" />' + meetTheTeamSpeakersArr[i].contactDescription + '</p><hr class="alt1" /></section>';
      }
      //read in the meet-the-team.html page and add the speakers html then send the html string
      fs.readFile(path.join(__dirname, '../views/meet-the-team.html'), function(err, speakersPage) {
        var speakersPageHtml = speakersPage.toString();
        speakersPageHtml = speakersPageHtml.replace('<main class="grid white-bg main-page-content the-team-section">', meetTheTeamSpeakersHtml);
        res.send(speakersPageHtml);
      });
    });
  });

  router.route('/contactus')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
  });

  router.route('/faq')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/faq.html'));
  });

  router.route('/latest-news')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/latest-news.html'));
  });

  router.get('/curriculum', eatAuth, function(req, res) {
    res.sendFile(path.join(__dirname, '../views/curriculum.html'));
  });

  router.route('/survey/:eventId')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/survey.html'));
  });

  router.route('/homepageteam')
  .get(function (req, res) {
    sql.sync()
    .then(function () { 
      Contact.findAll({where: {showOnHomePage: true}})
      .then(function (data) {
        res.json(data);
      })
      .error(function (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      });
    });
  });

  router.get('/private', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  });

  router.get('/admin', eatAuth, function(req, res) {
    if (req.cookies.interopAdmin === 'true') {
      res.sendFile(path.join(__dirname, '../views/admin.html'));
    } else {
      res.sendFile(path.join(__dirname, '../views/curriculum.html'));
    }
  });

  router.route('/thankyou')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, '../views/loggedout.html'));
  });

  
  router.route('/createevent')
  .post(upload.array('images', 2), function (req, res, next) {
    sql.sync()
    .then(function () {
      Event.create({
        eventName: req.body.newEventName,
        eventStartDate: req.body.newEventStartDate,
        eventEndDate: req.body.newEventEndDate,
        eventLocation: req.body.newEventLocation,
        eventHeaderImage: req.files[0].filename,
        eventHomepageImage: req.files[1].filename,
        eventContinent: req.body.newEventContinent,
        eventLocation: req.body.newEventLocation,
        eventHighlightColor: req.body.newEventColor
      })
      .then(function(newEvent) {
        // console.log(clc.bgGreen('   ::::::    '), newEvent.eventName);
        res.json(newEvent.id);
      })
      // console.log(clc.bgRed('    ::::::   '), req.body.speakersInput);
    })
  });

  router.route('/addspeakers')
  .post(function(req, res, next) {
    sql.sync()
    .then(function() {
      return Event.findOne({where: {id: req.body.eventId}})
    })
    .then(function(thisEvent) {
      thisEvent.eventSpeakers = req.body.speakers;
      thisEvent.save().then(function() {});
      console.log(clc.green.bgMagentaBright('    addspeakers req.body   '), thisEvent);
    })
  });

  router.route('/addtabs')
  .post(function(req, res, next) {
    sql.sync()
    .then(function() {
      console.log(clc.bgGreen.red('       ::::::::::::::::::     '), req.body);
      EventTab.create({
        eventId: req.body.eventId,
        tabNumber: req.body.tabNumber,
        tabTitle: req.body.tabTitle,
        tabContent: req.body.tabContent
      })
      res.end();
    })
  });

/*  router.route('/showimages')
  .get(function (req, res) {
    EventImage.findAll()
    .then(function (data) {
      res.json(data);
    });
  });*/

  router.route('/showimages')
  .get(function(req, res) {
    fs.readdir(path.join(__dirname, '../uploads'), function(err, files) {
      var outputHtml = '';
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      }

      for (var i = 0, j = files.length; i < j; i ++) {
        if (files[i] !== '.gitignore') {
          outputHtml += '<img class="imageToInsert" style="height: 50px; margin: 10px 10px 10px 10px" data-clipboard-text="/uploads/' + files[i] + '" src="/uploads/' + files[i] + '" />';
        }
      }
      outputHtml += '<script type="text/javascript">$(".imageToInsert").click(function() {$(this).toggleClass("animated shake");})'
      res.send(outputHtml);
    })
  })
  
  router.route('/addimage')
  .post(upload.single('images'), function (req, res, next) {
    // console.log(clc.yellow('FFFFFFFFFFFFFFFFF ::::::::   '), req.files)
    // res.json(req.files);
    res.end();
  });
  
    
  router.route('/future-events')
  .get(function (req, res) {
    var eventBlocksHtml = '<main class="events grid"><section class="col_12 internetExplorer">';
    var newHtml = '';
    var colNum = 4;
    var numFutureBlocks = 4;
    fs.readFile(path.join(__dirname, '../views/future-events.html'), function (err, html) {
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      }
      sql.sync()
      .then(function () {
        Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
        .then(function (upcomingEvent) {
          if (upcomingEvent.length < 4) {
            numFutureBlocks = upcomingEvent.length;
          }
          for (var i = 0; i < numFutureBlocks; i++) {
            var risingText = '';
            eventBlocksHtml += '<div class="col_' + 12 / numFutureBlocks + ' event_block" style="background-color: #' + continentColors[upcomingEvent[i].eventContinent] + ';"><a href="/' + upcomingEvent[i].eventUrl + '"><p>More Details</p><h1>' + upcomingEvent[i].eventLocation + '</h1><h3>' + upcomingEvent[i].eventName + '<br />' + months[upcomingEvent[i].eventStartDate.getMonth()] + ' ' + upcomingEvent[i].eventStartDate.getDate() + ' - ' + upcomingEvent[i].eventEndDate.getDate() + ', ' + upcomingEvent[i].eventEndDate.getFullYear() + '</h3></a>' + risingText + '</div>';
          }
          eventBlocksHtml += '</section>';
          newHtml = html.toString().replace('<main class="events grid">', eventBlocksHtml);
          res.send(newHtml);
        });
      });
    });
  });
  


  router.route('/events')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Event.findAll()
      .then(function (data) {
        data.sort(function (a, b) {
          a = new Date(a.eventStartDate);
          b = new Date(b.eventStartDate);
          if ( a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          if (a === b) {
            return 0;
          }
        });
        res.json(data);
      });
    });
  });

  router.route('/eventTabs')
  .get(function(req, res) {
    sql.sync()
    .then(function() {
      EventTab.findAll()
      .then(function(data) {
        res.json(data);
      });
    });
  });


router.route('/allevents/:eventId')
.get(function (req, res) {
  var picsHtml = '<div class="col_12 gallery">';
  var returnObj = {};
  sql.sync()
  .then(function () {
    Event.findOne({where: {id: req.params.eventId}})
    .then(function (data) {
      fs.readdir(path.join(__dirname, '../uploads/' + data.eventUrl), function (err, files) {
        for (var key in files) {
          picsHtml += '<a href="../uploads/' + data.eventUrl + '/' + files[key] + ' rel="gallery" class="fancybox" type="image" ><img src="../uploads/' + data.eventUrl + '/' + files[key] + '" width="100" height="100" /></a>';
        }
        picsHtml += '</div>';
        /*for (var i = 0, j = files.length; i < j; i++) {
          files[i] = '../uploads/' + data.eventUrl + '/' + files[i];
        }*/
        var testHtml = '<div class="col_12 gallery"><a href="../uploads/shanghaiinteropdevdays2015-2026/_MG_3990.JPG" rel="gallery"><img src="../uploads/shanghaiinteropdevdays2015-2026/_MG_3990.JPG" width="100" height="100" /></a><a href="../uploads/shanghaiinteropdevdays2015-2026/_MG_4077.JPG" rel="gallery"><img src="../uploads/shanghaiinteropdevdays2015-2026/_MG_4077.JPG" width="100" height="100" /></a></div>';
        returnObj.eventUrl = data.eventUrl;
        returnObj.picsHtml = picsHtml;
        returnObj.files = files;
        res.json(returnObj);
      });
    });
  });
});

  router.route('/contacts')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Contact.findAll()
      .then(function (data) {
        res.json(data);
      });
    });
  });
  
  router.route('/upcomingeventurls')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
      .then(function (data) {
        var theUrls = [];
        for (var i = 0; i < data.length; i++) {
          var tmpObj = {};
          tmpObj.url = data[i].eventUrl;
          tmpObj.eventName = data[i].eventName;
          theUrls.push(tmpObj);
        }
        res.json(theUrls);
      });
    });
  });

  //This route creates the html for the event pages
  router.route('/:eventUrl')
  .get(function(req, res) {
    //create an eventInfo object to hold the values for the event to be rendered
    var eventInfo = {};
    eventInfo.eventUrl = req.params.eventUrl;
    eventInfo.htmlContent = '';
    eventInfo.eventUltHtml = '<ul class="tabs left" id="eventTabLinks">';
    eventInfo.eventDivHtml = '';
    eventInfo.speakersHtml =  '';
    eventInfo.headerHtml = '';
    //sync with the database
    sql.sync()
    .then(function() {
      //trim the params to get the city and the year of the event
      var eventSearchCity = req.params.eventUrl.slice(0, -4);
      var eventYear = req.params.eventUrl.slice(-4);
      var testDate = new Date(eventYear - 1, 11, 31, 11, 59, 59);
      // search the database for event that matches the city and occurs on or after the year from the params and return the event found
      return Event.findOne({
        where: {
          eventLocation: eventSearchCity,
          eventStartDate: {$gte: testDate}
        }
      })
    })
    .then(function(theEvent) {
      //assign the event returned from the search to the event key of the eventInfo object
      eventInfo.event = theEvent;
    })
    .then(function() {
      // search for all the tabs that are associated with the current event
      return EventTab.findAll({
        where: {
          eventId: eventInfo.event.id
        }
      })
    })
    .then(function(theTabs) {
      console.log(clc.bgGreen.red('    :::::    '), theTabs);
      //assign the returned event tabs to the tabs key of the eventInfo object
      eventInfo.tabs = theTabs;
    })
    .then(function() {
      //split the speaker IDs into an array then search for all Contacts that haver an ID that appears in the array and return the result
      var speakersArr = eventInfo.event.eventSpeakers.split(',');
      return Contact.findAll({
        where: {
          id: {$in: speakersArr}
        }
      })
    })
    .then(function(theSpeakers) {
      //create an array and push each speaker object into it with the needed values and add the array to the eventInfo object
      var speakersArr =  [];
      var i = 0;
      for (var key in theSpeakers) {
        speakersArr[i] = {};
        speakersArr[i].firstName = theSpeakers[key].firstName;
        speakersArr[i].lastName = theSpeakers[key].lastName;
        speakersArr[i].msTeamTitle = theSpeakers[key].msTeamTitle;
        speakersArr[i].headShot = theSpeakers[key].headShot;
        speakersArr[i].contactDescription = theSpeakers[key].contactDescription;
        i++;
      }
      eventInfo.speakers = speakersArr;
      
      //if there are speakers in the speakers array
      if (eventInfo.speakers.length > 0) {
      //loop over the speakers array and create html for speakers tab
        for (var i = 0, j = eventInfo.speakers.length; i < j; i++) {
          eventInfo.speakersHtml += '<h4>' + eventInfo.speakers[i].firstName + ' ' + eventInfo.speakers[i].lastName + '</h4>';
          if (eventInfo.speakers[i].msTeamTitle) {
            eventInfo.speakersHtml += '<h5>' + eventInfo.speakers[i].msTeamTitle + '</h5><p>';
          }
          if (eventInfo.speakers[i].headShot) {
            eventInfo.speakersHtml += '<img class="pull-left speakersImg" height="165" width="165" src="../uploads/' + eventInfo.speakers[i].headShot + '" />';
          }
          if (eventInfo.speakers[i].contactDescription) {
            eventInfo.speakersHtml += eventInfo.speakers[i].contactDescription + '</p>';
          }
          eventInfo.speakersHtml += '<hr class="alt1" />';
        }
        
      }

      //if there are speakers, but no tabs add them as the only tab
      if (eventInfo.tabs.length === 0) {
        eventInfo.eventUltHtml += '<li class="last"><a href="#speakers"><h5>Speakers</h5></a></li></ul>';
        eventInfo.eventDivHtml += '<div id="speakers" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.speakersHtml  + '</div>';
      }
      //if there are event tabs loop over the tabs and create the html for the tabs
      for (var i = 0, j = eventInfo.tabs.length; i < j; i++) {
        //create the first tab with the first and current classes
        if (i === 0) {
          eventInfo.eventUltHtml += '<li class="first current"><a href="#' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '"><h5>' + eventInfo.tabs[i].tabTitle + '</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '" class="tab-content eventTabDiv" style="display:block;">' + eventInfo.tabs[i].tabContent  + '</div>';

        }
        //create the tabs that aren't first or last
        if (i > 0 && i <= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '<li><a href="#' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '"><h5>' + eventInfo.tabs[i].tabTitle + '</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.tabs[i].tabContent  + '</div>';

        }
        //if there are speakers add their html as the last tab
        if (eventInfo.speakers && i >= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '<li class="last"><a href="#speakers"><h5>Speakers</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="speakers" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.speakersHtml  + '</div>';
        }
        //if there are no speakers add the last eventTab as the last tab
        if (!eventInfo.speakers && i >= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '<li class="last"><a href="#' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '"><h5>' + eventInfo.tabs[i].tabTitle + '</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.tabs[i].tabContent  + '</div>';

        }
        //add the closing ul tag
        if (i >= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '</ul>';
        }
      }
      //combint the html for the UL menu and the divs
      eventInfo.htmlContent = eventInfo.eventUltHtml + eventInfo.eventDivHtml;
      //if there is an event header image create the html for the header image
      if (eventInfo.event.eventHeaderImage) {
        eventInfo.headerHtml = '<div class="col_12 internetExplorer event-header center" id="eventHeader"><img src="../uploads/' + eventInfo.event.eventHeaderImage + '" /></div>';
      }
      //read the blank event html file and turn the returned blob into a string, then replace the placeholder html content with the content created by the event
      fs.readFile(path.join(__dirname, '../views/blank-event.html'), function(err, data) {
        var theHtml = data.toString();            
        var fullEventHtml = theHtml.replace('<div class="col_12 internetExplorer event-header center" id="eventHeader"></div>', eventInfo.headerHtml).replace('<section class="col_12 internetExplorer event-tabs" id="eventTabs"></section>', '<section class="col_12 internetExplorer event-tabs" id="eventTabs">' + eventInfo.htmlContent + '</section>');
        res.send(fullEventHtml);
      })
      
    })
  });

  //This route has to be last or it will override the other routes
  /*router.route('/:eventName')
  .get(function (req, res) {
    // var cat = req.params.eventName.toLowerCase().replace(/\s+/g, '');
    var theParam = req.params.eventName.toLowerCase().slice(1);
    sql.sync()
    .then(function () {
      Event.findAll()
      .then(function (data) {
        var testArr = [];
        for (var i = 0; i < data.length; i++) {
          testArr.push(data[i].eventUrl);
        }
        if (testArr.indexOf(req.params.eventName) !== -1) {
          res.sendFile(path.join(__dirname, '../views/blank-event.html'));  
        } 
        if (testArr.indexOf(req.params.eventName) === -1) {
          res.status(404);
          // res.send(path.join(__dirname, '../views/thank-you.html')); //I need to make a 404 page
        }
      });
    });
  });
  */
};