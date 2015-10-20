'use strict';

var Contact = require('../models/Contact');
var NewsletterSignup = require('../models/NewsletterSignup');
var SuggestedCity = require('../models/SuggestedCity');
var aboutUs = require('../views/about')();
var fs = require('fs');
var $ = require('cheerio');
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

	router.route('/showfullteam')
  .get(function (req, res) {
    var start = new Date().getTime();
    console.log('start time : ', start);
    sql.sync()
    .then(function () {
      Contact.findAll({where: {msTeamMember: true}})
      .then(function (data) {
        // console.log(newAboutText);
        res.json(data);
      })
      .error(function (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      });
    });
    // console.log(about);
  });

  router.route('/homepageteam')
  .get(function (req, res) {
  	sql.sync()
  	.then(function () {
  		Contact.findAll({where: {showOnHomePage: true}})
  		.then(function (data) {
  			res.json(data)
  		})
  		.error(function (err) {
  			console(err);
  			res.status(500).json({msg: 'internal server error'});
  		})
  	})
  })
};