'use strict';

var Contact = require('../models/Contact');
var NewsletterSignup = require('../models/NewsletterSignup');
var SuggestedCity = require('../models/SuggestedCity');
var Interest = require('../models/Interest');
var Event = require('../models/Event');
var EventOverview = require('../models/EventOverview');
var EventSchedule = require('../models/EventSchedule');
var EventAttendee = require('../models/EventAttendee');
var aboutUs = require('../views/about')();
var fs = require('fs');
// var $ = require('cheerio');
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

  router.route('/suggestacity')
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
        Contact.findOne({where: {email: req.body.email}})
        .then(function (data2) {
          if (data2.recommendedCity === null) {
            data2.updateAttributes({recommendedCity: req.body.city +  ', SuggestedCity Id : ' + data.id}); 
          } else {
            data2.updateAttributes({
              recommendedCity: data2.recommendedCity + ' | ' + req.body.city +  ', SuggestedCity Id : ' + data.id
            })
          }
        });
      });
    })
    .then(function () {
      res.sendFile(path.join(__dirname, '../views/thank-you.html'));
    })
    .error(function (err) {
      console.log(err);
      res.status(500).json({msg: 'internal server error'});
    });
  });

// make dynamic routes for events

/*fs.readFile(path.join(__dirname, '../views/blank-event.html'), function (err, data) {
  var theHtml = data.toString();
  var theSpeakers = '<div id="eventSpeakers" class="tab-content"><h2>2015 Storage Developer Conference Speakers</h2><hr /><h4>';
  var newHtml = '';
  sql.sync()
  .then(function () {
  var eventEndpoints = [];
    Contact.findAll({where: {role: 'speaker'}})
    .then(function (speakers) {
      for (var i = 0; i < speakers.length; i++) {
        eventEndpoints.push('/' + speakers[i].divId);
      }
      for (var j = 0; j < eventEndpoints.length; j++) {
    // console.log('ELEM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', theHtml);
        var name = eventEndpoints[j];
        theSpeakers += speakers[j].firstName + ' ' + speakers[j].lastName + '</h4><h5>' + speakers[j].msTeamTitle + '</h5><p><img class="pull-left" src="data:image;base64,' + speakers[j].headShot + '" />' + speakers[j].contactDescription + '</p><hr />';        newHtml = theHtml.replace('<div id="eventSpeakers" class="tab-content">', theSpeakers);
        router.get(name, function (req, res) {
          res.send(newHtml);
        })
      }
    });
  });
});*/

fs.readFile(path.join(__dirname, '../views/blank-event.html'), function (err, data) {
  var theHtml = data.toString();
  var theSpeakersHtml = '<div id="eventSpeakers" class="tab-content"><h2>2015 Storage Developer Conference Speakers</h2><hr /><h4>';
  var theOverViewHtml = '<div id="event-overview" class="tab-content">';
  var theScheduleUl = '<div id="event-schedule" class="tab-content"><ul class="tabs center">';
  var theScheduleTable = '';
  var theScheduleTableBody = '';
  sql.sync()
  .then(function () {
  var eventEndpoints = [];
  var newHtml = [];
    Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
    .then(function (eventsTable) {
      for (var i = 0; i < eventsTable.length; i++) {
        var thisEventName = eventsTable[i].eventName;
        // console.log('IIIIIIIIIII ::::::::::: ', eventsTable[i].eventUrl);
        EventOverview.findAll({where: {eventId: eventsTable[i].id}})
        .then(function (overviewTable) {
          theOverViewHtml += '<h2>' + thisEventName + '</h2>';
          for (var j = 0; j < overviewTable.length; j++) {
            theOverViewHtml += '<h3>' + overviewTable[j].headingText + '</h3><p>' + overviewTable[j].paragraphText + '</p>';
            // console.log(overviewTable[j].paragraphText);
          }
          theHtml = theHtml.replace('<div id="event-overview" class="tab-content">', theOverViewHtml);
          // console.log('IIIIIIIIIII ::::::::::: ', i)
          EventSchedule.findAll({where: {eventId: eventsTable[i - 1].id}})
          .then(function (scheduleTable) {
            var dayTestArr = [];
            for (var k = 0; k < scheduleTable.length; k++) {
              theScheduleTableBody += '<tr><td>' + scheduleTable[k].scheduleTime + '</td><td>' + scheduleTable[k].description + '</td></tr>';
              if (dayTestArr.indexOf(scheduleTable[k].scheduleDay) === -1) {
                theScheduleTableBody += '</tr></tbody></table></div><div id="tabr' + scheduleTable[k].scheduleDay + '" class="tab-content">';
                theScheduleUl += '<li><a href="#tabr' + scheduleTable[k].scheduleDay + '"><h5>' + scheduleTable[k].scheduleDay + '</h5></a></li>';
                theScheduleTable += '<div id="tabr' + scheduleTable[k].scheduleDay + '" class="tab-content"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + scheduleTable[k].scheduleDay + '</h3></th></tr></thead><tbody></tbody></table></div>';
              }
              dayTestArr.push(scheduleTable[k].scheduleDay);

            }
            theScheduleUl += '</ul>';
            console.log(theScheduleTable);
            theHtml = theHtml.replace('<div id="event-schedule" class="tab-content">', theScheduleUl);

          // console.log(scheduleTable[0].scheduleDay);
            EventAttendee.findAll({where: {$and: {eventId: eventsTable[i - 1].id, eventAttendeeRole: 'speaker'}}})
            .then(function (attendeeTable) {
              for (var l = 0; l < attendeeTable.length; l++) {
                Contact.findAll({where: {id: attendeeTable[l].attendeeId}})
                .then(function (speakersTable) {
                  for (var m = 0; m < speakersTable.length; m++) {
                    theSpeakersHtml += speakersTable[m].firstName + ' ' + speakersTable[m].lastName + '</h4><h5>' + speakersTable[m].msTeamTitle + '</h5><p><img class="pull-left" src="data:image;base64,' + speakersTable[m].headShot + '" />' + speakersTable[m].contactDescription + '</p><hr />';
                  }
                  // console.log('JJJJJJJJJJJ ::::::::  ', theOverViewHtml);                    
                  theHtml = theHtml.replace('<div id="eventSpeakers" class="tab-content">', theSpeakersHtml);
                  router.get('/' + eventsTable[i - 1].eventUrl, function (req, res) {
                    res.send(theHtml);
                  });
                });
              }
            });
          });
        });
      }
    });
  });
});

/*        EventAttendee.findAll({where: {$and: {eventId: eventsTable[i].id, eventAttendeeRole: 'speaker'}}})
        .then(function (speakersTable) {
          for (var j = 0; j < speakersTable.length; j++) {
            Contact.findAll({where: {id: speakersTable[j].attendeeId}})
            .then(function (contactsTable) {
              EventOverview.findAll({where: {eventId: eventsTable[i - 1].id}})
              .then(function (overviewTable) {
                EventSchedule.findAll({where: {eventId: eventsTable[i - 1].id}})
                .then(function (scheduleTable) {
                  console.log(scheduleTable);
                })
              })
            })
          }
        })*/













/*              for (var k = 0; k < contactsTable.length; k++) {
                theSpeakersHtml += contactsTable[k].firstName + ' ' + contactsTable[k].lastName + '</h4><h5>' + contactsTable[k].msTeamTitle + '</h5><p><img class="pull-left" src="data:image;base64,' + contactsTable[k].headShot + '" />' + contactsTable[k].contactDescription + '</p><hr />';
              }
              newHtml = theHtml.replace('<div id="eventSpeakers" class="tab-content">', theSpeakersHtml);
              // console.log(newHtml);
              console.log('EVENT URL ::::::: ', eventsTable[i - 1].eventUrl);*/
              /*router.get('/' + eventsTable[i - 1].eventUrl, function (req, res) {
                res.send(newHtml);
              })*/

/*      for (var i = 0; i < events.length; i++) {
        eventEndpoints.push('/' + events[i].eventUrl);
        console.log('EVENT URL ::::::: ', events[i].eventUrl)
      }
      for (var j = 0; j < eventEndpoints.length; j++) {
    // console.log('ELEM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', theHtml);
        var name = eventEndpoints[j];
        router.get(name, function (req, res) {
          res.send(newHtml);
        })
      }*/


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