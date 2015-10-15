'use strict';

var Contact = require('../models/Contact');
var SuggestedCity = require('../models/SuggestedCity');
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

  router.route('/map')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/world-map.html'));
  })
  .post(function (req, res) {
    sql.sync()
    .then(function () {
      Contact.find({where: {email: req.body.email}})
      .then(function (data) {
      if (!data) {
        Contact.create({
          email: req.body.email
        });
      }

      });
    })
    .then(function () {
      SuggestedCity.create(req.body)
      .then(function (data) {
        var theCity = data;
        Contact.findOne({where: {email: req.body.email}})
        .then(function (data2) {
          data2.updateAttributes({
            recommendedCity: data2.recommendedCity + ' | ' + req.body.city +  ', SuggestedCity Id : ' + data.id
          });
        });
      });
    })
    .then(function () {
      res.sendFile(path.join(__dirname, '../views/world-map.html'));
    })
    .error(function (err) {
      console.log(err);
      res.status(500).json({msg: 'internal server error'});
    });
  });
};