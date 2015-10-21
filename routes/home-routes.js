'use strict';
var Contact = require('../models/Contact');
var Interest = require('../models/Interest');
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
      Contact.findOne({where: {email: req.body.email}})
      .then(function (data) {
        if (!data) {
          Contact.create(req.body);
        }
        if (data) {
          data.updateAttributes(req.body);
          data.updateAttributes({newsletterSubscription: req.body.newsletterSubscription});
        }
        Interest.findOne({where: {contactId: data.id}})
        .then(function (data2) {
          
          if (!data2) {
            Interest.create(req.body)
            .then(function (interests) {
              // console.log('DATA DATA DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! : ', interests);
              interests.updateAttributes({contactId: data.id});
            })
            .then(function () {
              
              data.updateAttributes({interestId: interests.id});
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
  });
};