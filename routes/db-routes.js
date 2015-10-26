'use strict';

var Contact = require('../models/Contact');
var NewsletterSignup = require('../models/NewsletterSignup');
var SuggestedCity = require('../models/SuggestedCity');
var Interest = require('../models/Interest');
var Event = require('../models/Event');
var EventOverview = require('../models/EventOverview');
var EventSchedule = require('../models/EventSchedule');
var EventAttendee = require('../models/EventAttendee');
var EventSponsorInfo = require('../models/EventSponsorInfo');
var EventPlatinumSponsor = require('../models/EventPlatinumSponsor');
var EventGoldSponsor = require('../models/EventGoldSponsor');
var EventSilverSponsor = require('../models/EventSilverSponsor');
var EventBronzeSponsor = require('../models/EventBronzeSponsor');
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
//Read the blank html file to us for a template
fs.readFile(path.join(__dirname, '../views/blank-event.html'), function (err, data) {
  var theHtml = data.toString();
  var theSpeakersHtml = '<div id="eventSpeakers" class="tab-content"><h2>2015 Storage Developer Conference Speakers</h2><hr /><h4>';
  var theOverViewHtml = '<div id="event-overview" class="tab-content">';
  var theScheduleUl = '<div id="event-schedule" class="tab-content"><ul class="tabs center">';
  var theScheduleTableBody = '';
  var mediaSponsorTab = '<div id="eventSponsors" class="tab-content">';
  //sync database
  sql.sync()
  //then 
  .then(function () {
    //declare array to hold endpoint urls for all events
    var eventEndpoints = [];
    //find all events happening in the future
    Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
    .then(function (eventsTable) {
      //loop over the events table
      for (var i = 0; i < eventsTable.length; i++) {
        //declare variable to hold event name
        var thisEventName = eventsTable[i].eventName;
        var thisEventId = eventsTable[i].id; 
        //search for EventOverview table that has the id as the current event
        EventOverview.findAll({where: {eventId: thisEventId}})
        .then(function (overviewTable) {
          //insert the current event name in h2 tags
          theOverViewHtml += '<h2>' + thisEventName + '</h2>';
          //loop over overview table and put headings in h3 tags and paragraph txt in p tags
          for (var j = 0; j < overviewTable.length; j++) {
            theOverViewHtml += '<h3>' + overviewTable[j].headingText + '</h3><p>' + overviewTable[j].paragraphText + '</p>';
          }
          //replace the empty div in the template string with the new event overview string
          theHtml = theHtml.replace('<div id="event-overview" class="tab-content">', theOverViewHtml);
          //find EventSchedule tables with the current event (i has been indexed up one, so it needs 1 subtracted to have the right index)
          EventSchedule.findAll({where: {eventId: thisEventId}})
          .then(function (scheduleTable) {
            //declare array to hold day names and object to hold daily schedules
            var dayTestArr = [];
            var dailySchedule = {};
            //loop over the EventSchedule table and add each unique day to the tabs ul and the dayTestArr
            for (var k = 0; k < scheduleTable.length; k++) {
              if (dayTestArr.indexOf(scheduleTable[k].scheduleDay) === -1) {
                theScheduleUl += '<li><a href="#tabr' + scheduleTable[k].scheduleDay + '"><h5>' + scheduleTable[k].scheduleDay + '</h5></a></li>';
              dayTestArr.push(scheduleTable[k].scheduleDay);
              dailySchedule[scheduleTable[k].scheduleDay] = {};
              }              
            }
            //add the description to the times created in the dailySchedule object
            for (var l = 0; l < scheduleTable.length; l++) {
              dailySchedule[scheduleTable[l].scheduleDay][scheduleTable[l].scheduleTime] = scheduleTable[l].description;
            }
            //for each key in the dailySchedule object create an table header
            for (var key in dailySchedule) {
              var tmpSchedule = ''
              theScheduleTableBody += '<div id="tabr' + key + '" class="tab-content"><table cellspacing="0" cellpadding="0" class="striped schedule"><thead><tr><th><h3>' + key + '</h3></th></tr></thead><tbody>' + key + '</tbody></table></div>';
              // loop over keys in daily sub objects of dailySchedule object and create a table row to insert in the table body
              for (var key2 in dailySchedule[key]) {
                tmpSchedule += '<tr><td>' + key2 + '</td><td>' + dailySchedule[key][key2] + '</td></tr>';
              }
              //replace the empty table body (determined by matching the innner key to the right day) with the tmpSchedule string
              theScheduleTableBody = theScheduleTableBody.replace('<tbody>' + key + '</tbody>', tmpSchedule);
            }
            //close the schedule body and schedul ul strings
            theScheduleTableBody += '</div>';
            theScheduleUl += '</ul>';
            //combine the theScheduleUl and theScheduleTableBody strings
            theScheduleUl += theScheduleTableBody;
            //replace the empty div with the created string
            theHtml = theHtml.replace('<div id="event-schedule" class="tab-content">', theScheduleUl);
            //find all event attendees who are speakers and attendees of the currect event
            EventAttendee.findAll({where: {$and: {eventId: thisEventId, eventAttendeeRole: 'speaker'}}})
            .then(function (attendeeTable) {
              //loop over the Contacts table to find the speakers of the current event
              for (var m = 0; m < attendeeTable.length; m++) {
                Contact.findAll({where: {id: attendeeTable[m].attendeeId}})
                .then(function (speakersTable) {
                  //loop over speakersTable and create a string of html to output
                  for (var m = 0; m < speakersTable.length; m++) {
                    theSpeakersHtml += speakersTable[m].firstName + ' ' + speakersTable[m].lastName + '</h4><h5>' + speakersTable[m].msTeamTitle + '</h5><p><img class="pull-left" src="data:image;base64,' + speakersTable[m].headShot + '" />' + speakersTable[m].contactDescription + '</p><hr />';
                  }
                  // Replace the empty div for the speakers with the string containing the content                  
                  theHtml = theHtml.replace('<div id="eventSpeakers" class="tab-content">', theSpeakersHtml);

                });
              }
              EventSponsorInfo.findAll({where: {eventId: thisEventId}})
              .then(function (sponsorInfo) {
                for (var ii = 0; ii < sponsorInfo.length; ii++) {
                  mediaSponsorTab += '<h2>' + sponsorInfo[ii].sponsorshipHeading + '</h2><hr class="alt1" /><p>' + sponsorInfo[ii].sponsorshipParagraph + '</p><ht class="alt1" />';
                }
                EventPlatinumSponsor.findAll({where: {eventId: thisEventId}})
                .then(function (platinumSponsors) {
                  
                  theHtml = theHtml.replace('<div id="eventSponsors" class="tab-content">', mediaSponsorTab);
                  //send string of thml with all info to client
                  router.get('/' + eventsTable[i - 1].eventUrl, function (req, res) {
                    res.send(theHtml);
                })
                });
              })
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