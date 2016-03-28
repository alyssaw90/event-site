'use strict';

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
var eatAuth = require('../lib/eat_auth')(process.env.SECRET_KEY);
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
    console.log(clc.xterm(46)('Unable to connect to the database with admin router: '), err);
  } else {
    console.log(clc.xterm(46)('Connection has been established successfully with admin router.'));
  }
});

module.exports = function(router) {
  router.use(bodyparser.json());
  router.use(bodyparser.urlencoded({
    extended: true
  }));
  router.use(cookieParser());


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

 /* router.route('/createevent')
  .post(upload.array('images', 4), function (req, res, next) {
    sql.sync()
    .then(function () {
      // Event.create(req.body)
      Event.create({
     //    eventName: Sql.STRING,
  			// eventRegistrationLink: Sql.STRING, //link to registrationfor event
  			// eventLocation: Sql.STRING,
  			// eventContinent: Sql.ENUM('North America', 'South America', 'Africa', 'Asia', 'Europe', 'Oceania'),
  			// eventStartDate: Sql.DATE, //the start date...
  			// eventEndDate: Sql.DATE, // the end date...
  			// eventHeaderImage: Sql.TEXT, //link to header image
  			// eventHomepageImage: Sql.TEXT, //link to homepage image
  			// eventHighlightColor: Sql.TEXT, //what color to use to highlight the homepage
  			// eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
  			// eventFuturePageText: Sql.TEXT, //slide up text for future events page
  			// eventSpeakers: Sql.STRING
      });
      res.end();
    });
  });*/
}
