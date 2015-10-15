'use strict';

var express = require('express');
var app = express();
var $ = require('cheerio');
var bodyParser = require('body-parser');
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
var SuggestedCity = require('./models/SuggestedCity.js');
var NewsletterSignup = require('./models/NewsletterSignup.js');
var Contact = require('./models/Contact.js');
var fs = require('fs');
var port = process.env.PORT || 3000;
var time = new Date();
var aboutUs = require('./views/about')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));

// homepage routes
app.route('/')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
})
.post(function (req, res) {
  sql.sync()
  .then(function (data) {
    NewsletterSignup.create(req.body);
    res.sendFile(path.join(__dirname, '/index.html'));
  })
  .error(function (err) {
    console.log(err);
    res.status(500).json({msg: 'internal server error'});
  });
});

//map routes
app.route('/map')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/world-map.html'));
})
.post(function (req, res) {
    // Add these values to your MySQL database here
    sql.sync()
    .then(function () {
      Contact.find({where: {email: req.body.email}})
      .then(function (data) {
      if (!data) {
      console.log('IF STATEMENT REACHED');
        Contact.create({
          email: req.body.email
        });
      }

      })
    })
    .then(function () {
      SuggestedCity.create(req.body)
      .then(function (data) {
        var theCity = data;
        Contact.findOne({where: {email: req.body.email}})
        .then(function (data2) {
        // console.log('DATA : ', data2.recommendedCity)
          data2.updateAttributes({
            recommendedCity: data2.recommendedCity+ ' | ' + req.body.city +  ', SuggestedCity Id : ' + data.id
          })
        })
      })
    })
    .then(function () {
      res.sendFile(path.join(__dirname, '/views/world-map.html'));
    })
    .error(function (err) {
      console.log(err);
      res.status(500).json({msg: 'internal server error'});
    });
});

app.route('/latest-news')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/latest-news.html'));
})
.post(function (req, res) {
  sql.sync()
  .then(function (data) {
    NewsletterSignup.create(req.body);
    res.sendFile(path.join(__dirname, '/views/latest-news.html'));
  })
  .error(function (err) {
    console.log(err);
    res.status(500).json({msg: 'internal server error'});
  });
});

app.route('/find-an-event')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/find-an-event.html'));
});

app.route('/past-events')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/past-events.html'));
});

app.route('/media')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/media.html'));
});

app.route('/faq')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/faq.html'));
});

app.route('/meet-the-team')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/meet-the-team.html'));
});

app.route('/contact')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/contact.html'));
});

// app.route('/about')
// .get(function (req, res) {
//   res.sendFile(path.join(__dirname, '/views/about.html'));
// });

app.route('/santa-clara-2015')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/events/santa-clara-2015.html'));
});

// var about = $.load('/views/about.html');

app.route('/about')
.get(function (req, res) {
  var start = new Date().getTime();
  console.log('start time : ', start);
  fs.readFile(path.join(__dirname, '/blank.html'), function (err, data) {
    var about = data.toString();
    var newAboutText = '<div class="container-div">' + aboutUs;
    if (err) {
      console.log(err);
    }
    sql.sync()
    .then(function () {
      SuggestedCity.all()
      .then(function (data) {
        $(data).each(function (i, elem) {
          newAboutText += '<h2>' + elem.city + '</h2>' + '<h2>' + elem.email + '</h2>';
        })
        console.log(newAboutText);
        var newAbout = about.replace('<div class="container-div">', newAboutText);        
        res.send(newAbout)
        var end = new Date().getTime();
        console.log('end time : ', end);
      })
      .error(function (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      })
    })
  });
  // console.log(about);
});

/*app.get('/about', function (req, res) {
    sql.sync()
    .then(function () {
      SuggestedCity.all()
      .then(function (data) {        
        res.json(data)
        var end = new Date().getTime();
        console.log('end time : ', end);
      })
      .error(function (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      })
    })
  });*/

app.listen(port, function () {
	console.log('server started on port ' + port + ' at ' + time);
});
