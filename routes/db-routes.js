'use strict';

var Contact = require('../models/Contact');
var NewsletterSignup = require('../models/NewsletterSignup');
var SuggestedCity = require('../models/SuggestedCity');
var Interest = require('../models/Interest');
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
  			res.json(data);
  		})
  		.error(function (err) {
  			console(err);
  			res.status(500).json({msg: 'internal server error'});
  		});
  	});
  });

  router.route('/newsletter')
  .post(function (req, res) {
    sql.sync()
    .then(function () {
      Contact.findOne({where: {email: req.body.email}})
      .then(function (data) {
        if (!data) {
          Contact.create(req.body)
          .then(function (newContact) {
            Interest.create(req.body)
            .then(function (newInterests) {
              newInterests.updateAttributes({contactId: newContact.id})
              .then(function () {
                newContact.updateAttributes({interestId: newInterests.id});
              });
            });
          });
        }
        if (data) {
          data.updateAttributes(req.body)
          // data.updateAttributes({newsletterSubscription: req.body.newsletterSubscription});
          .then(function () {
            Interest.findOne({where: {contactId: data.id}})
            .then(function (data2) {   
              if (!data2) {
                Interest.create(req.body)
                .then(function (interests) {
                  interests.updateAttributes({contactId: data.id});
                })
                .then(function () {
                  data.updateAttributes({interestId: interests.id});
                });
              }
              if (data2) {
                data2.updateAttributes(req.body);
              }
            });
            
          });
        }
      })
      .then(
        res.sendFile(path.join(__dirname, '../views/thank-you.html'))
      );
    })
    .error(function (err) {
      router.alert(err);
      console.log(err);
      res.status(500).json({msg: 'internal server error'});
    });
  });

  /*router.route('/addcontact')
  .post(function (req, res) {
    sql.sync()
    .then(function () {
      // NewsletterSignup.create(req.body)
          console.log('DATA : ', req);
      Contact.find({where: {email: req.body.email}})
      .then(function (data) {
        if (!data) {
          Contact.create(req.body);
        }
        if (data) {
          data.updateAttributes(req.body);
        }
        Interest.findOne({where: {contactId: data.id}})
        .then(function (data2) {
          
          if (!data2) {
            Interest.create(req.body)
            .then(function (interests) {
              console.log(interests, 'Interest')
              interests.findOne({where: {id: interests.id}})
            })
          }
          if (data2) {
            data2.updateAttributes(req.body);
          }
        })
      })
      .then(
        res.sendFile(path.join(__dirname, '../index.html'))
      )
    })
    .error(function (err) {
      router.alert(err);
      console.log(err);
      res.status(500).json({msg: 'internal server error'});
    });
  });*/
};