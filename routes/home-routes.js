'use strict';

var Contact = require('../models/Contact');
var NewsletterSignup = require('../models/NewsletterSignup');
var bodyparser = require('body-parser');
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

module.exports = function (router) {
  router.use(bodyparser.json());
  router.use(bodyparser.urlencoded({
    extended: true
  }));

  router.route('/')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  })
  .post(function (req, res) {
    sql.sync()
    .then(function () {
      // NewsletterSignup.create(req.body)
      Contact.find({where: {email: req.body.email}})
      .then(function (data) {
        if (!data) {
          console.log('if statement reached', req.body);
          Contact.create(req.body);
        }
        if (data) {
          data.updateAttributes(req.body);
        }
        console.log('DATA : ', data);
      })
    })
    .then(function () {
      res.sendFile(path.join(__dirname, '../index.html'));
    })
    .error(function (err) {
      router.alert(err);
      console.log(err);
      res.status(500).json({msg: 'internal server error'});
    });
  });
};