'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var Sql = require('sequelize');
// var sql = new Sql('events_page', 'eventsUser', 'I@m@pr0gr@mm3r', {dialect: 'mssql'});
// var connectionstring="Data Source=server.js;Initial Catalog=events_page;User ID=REDMOND\\v-mibowe;Password=I@m@pr0gr@mm3r;Provider=SQLOLEDB";
var sql = new Sql('events_page', 'test1', 'p@ssw0rd1', {
  host: 'localhost/events_page',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
var SuggestedCity = require('./models/SuggestedCity.js');
var fs = require('fs');
var port = process.env.PORT || 3000;
var time = new Date();
var db = sql.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(function () {
    if (sql === true) {console.log('success')};
}())
    console.log('DB : ', db);

app.use(express.static(__dirname + '/'));

// homepage routes
app.route('/')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
})
.post(function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));

  console.log('req.body - homepage : ', req.body);
});

// /map routes
app.route('/map')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/world-map.html'));
})
.post(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/world-map.html'));
  // res.send(req.body);
  // res.json(res);
    console.log('req.body : ', req.body);
    // fs.writeFile('./db/filename' + '.JSON', 'Hello World 2', function (err) {
    //  if (err) {console.error(err)};
    //  console.log('file saved');
    // })
    // Add these values to your MySQL database here
    sql.sync()
    .then(function () {
      SuggestedCity.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .error(function (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      })
    })
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

app.route('/latest-news')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/latest-news.html'));
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

app.route('/about')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.route('/santa-clara-2015')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/views/events/santa-clara-2015.html'));
});

app.listen(port, function () {
	console.log('server started on port ' + port + ' at ' + time);
});
;