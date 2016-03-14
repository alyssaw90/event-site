'use strict';
/*global interests */
/*global ContactsSuggestedCity */

require('dotenv').load();
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
var eatAuth = require('../lib/eat_auth')(process.env.SECRET_KEY)
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

sql.authenticate()
  .then(function (err) {
    if (err) {
      console.log(clc.xterm(202)('Unable to connect to the database: '), err);
    } else {
      console.log(clc.xterm(202)('Connection has been established successfully.'));
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

  /*router.route('/admin')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../admin/admin.html'));
  });*/

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

  router.route('/meet-the-team')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/meet-the-team.html'));
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

  router.get('/curriculum', /*eatAuth,*/ function(req, res) {
    res.sendFile(path.join(__dirname, '../views/curriculum.html'));
  })
   router.get('/curriculum2', eatAuth, function(req, res) {
    res.sendFile(path.join(__dirname, '../views/faq.html'));
  })

  router.route('/survey/:eventId')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/survey.html'));
  });

  router.route('/showfullteam')
  .get(function (req, res) {
    var start = new Date().getTime();
    sql.sync()
    .then(function () {
      Contact.findAll({where: {showOnMeetTheTeamPage: true}})
      .then(function (data) {
        res.json(data);
      })
      .error(function (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      });
    });
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
  
  router.route('/createevent')
  .post(upload.array('images', 4), function (req, res, next) {
    sql.sync()
    .then(function () {
      // Event.create(req.body)
      Event.create({
        eventName: req.body.eventName,
        eventRegistrationLink: req.body.eventRegistrationLink, //link to registrationfor event
        eventLocation: req.body.eventLocation,
        eventStartDate: req.body.eventStartDate, //the start date...
        eventEndDate: req.body.eventEndDate, // the end date...
        eventHeaderImage: req.files[0].filename, //link to header image
        eventFuturePageImage: req.files[1].filename, //image to appear on event slide on homepage
        eventFuturePageText: req.body.eventFuturePageText, //slide up text for future events page
        eventSlideshowImage: req.files[2].filename, //image for front page slider
        homepageBulletOne: req.body.homepageBulletOne,
        homepageBulletTwo: req.body.homepageBulletTwo,
        homepageBulletThree: req.body.homepageBulletThree,
        eventSponsorsTab: req.body.eventSponsorsTab, //copy for Sponsors Tab
        eventOverviewTab: req.body.eventOverviewTab, //copy for Overview Tab
        travelTabHeaderImage: req.files[3].filename, //image to appear above travel tabs
        travelVenueTab: req.body.travelVenueTab, //copy for travel venue sub tab
        travelTravelTab: req.body.travelTravelTab, //copy for trave travel sub tab
        travelAccomodationsTab: req.body.travelAccomodationsTab, //copy for travel accommodations sub tab
        travelTipsTab: req.body.travelTipsTab, //copy for travel Tips and Tricks sub tab
        travelEatDrinkTab: req.body.travelEatDrinkTab, //copy for travel eat and drink sub tab
        eventMediaTab: req.body.eventMediaTab //copy for media tab
      });
      res.end();
    });
  });

router.route('/showimages')
.get(function (req, res) {
  EventImage.findAll()
  .then(function (data) {
    res.json(data);
  });
});

router.route('/addimage')
.post(upload.single('images'), function (req, res, next) {
  // console.log(clc.yellow('FFFFFFFFFFFFFFFFF ::::::::   '), req.files)
  res.json(req.files);
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
  
/*  router.route('/events')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Event.findAll({where: {eventStartDate:{ $gte: new Date()}}})
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
  });*/

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

  //This route has to be last or it will override the other routes
  router.route('/:eventName')
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

  //This route has to be last or it will override the other routes
  router.route('/test/:eventName')
  .get(function (req, res) {
    // var cat = req.params.eventName.toLowerCase().replace(/\s+/g, '');
    var theParam = req.params.eventName.toLowerCase().slice(1);
    sql.sync()
    .then(function () {
      Event2.findAll()
      .then(function (data) {
        var testArr = [];
        for (var i = 0; i < data.length; i++) {
          testArr.push(data[i].eventUrl);
        }
        if (testArr.indexOf(req.params.eventName) !== -1) {
          res.sendFile(path.join(__dirname, '../views/blank-event-2.html'));  
        } 
        if (testArr.indexOf(req.params.eventName) === -1) {
          res.status(404);
          res.send(path.join(__dirname, '../views/thank-you.html')); //I need to make a 404 page
        }
      });
    });
  });
  
};