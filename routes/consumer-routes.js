'use strict';

const fs = require('fs');
const clc = require('cli-color');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  const bodyparser = require('body-parser');
  const cookieParser = require('cookie-parser');
  const path = require('path');
  const models = require('../models');
  const User = models.User;
  const Speaker = models.Speaker;
  const Event = models.Event;
  const EventTab = models.EventTab;
  const Slideshow = models.Slideshow;
  const Slide = models.Slide;
  const MsUser = models.MsUser;
  const Surveys = models.Surveys;
  const placeholders = require('../models/placeholders');
  const dbRelationships = require('../models/relationships');
  const multipart = require('connect-multiparty');
  const multipartMiddleware = multipart({
    autoFiles: true,
    uploadDir: 'uploads/'
  });

  models.sql.authenticate()
  .then( (err) => {
    if (err) {
      console.log(clc.xterm(202)('Unable to connect to the database with db router: '), err);
    } else {
      console.log(clc.xterm(202)('Connection has been established successfully with db router.'));
    }
  });

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const continentColors = {'North America': '#007233', 'South America': '#D13900', 'Africa': '#B4009E', 'Asia': '#0072C6', 'Europe': '#442359', 'Oceania': '#008272'};
  
  module.exports = (router) => {
    router.use(bodyparser.json({
      limit: '500mb',
      type:'application/json'
    }));
    router.use(bodyparser.urlencoded({
      limit: '500mb',
      extended: true,
      parameterLimit:50000
    }));
    router.use(cookieParser());
  
    //get Speakers to show on meet the team page
    router.route('/getTeam')
    .get(function(req, res) {
      models.sql.sync()
      .then(function() {
        return Speaker.findAll({
          where: {
            showOnMeetTheTeamPage: true,
            isPublished: true
          }
        })
      })
      .then( (teamMembers) => {
        res.json(teamMembers);
        // console.log(teamMembers);  
      })
    })

    //Get upcoming events for header, carousel, and upcoming events page
  router.route('/futureEventsData')
  .get( (req, res) => {
    let eventDates = 'Coming Soon';
    let eventMonth;
    let city;
    let cityArr;
    models.sql.sync()
    .then( () => {
      return Event.findAll({
        where: {
          eventEndDate: {
            $or: {
              $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
              $eq: null
            }
          },
          isPublished: true
        }
      })
    })
    .then( (upcomingEvents) => {
      let outputArr = [];
      upcomingEvents.sort( (a, b) => {
        a = a.eventEndDate;
        b = b.eventEndDate;
        if (a === null) {
          let tmpDate = new Date();
          a = tmpDate.setMonth(11, 31);
        }
        if (b === null) {
          let tmpDate = new Date();
          b = tmpDate.setMonth(11, 31);
        }
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        if (a === b) {
          return 0;
        }
      });

      for (let i = 0, len = upcomingEvents.length; i < len; i++) {
        let eventObj = {};
        let startYear;
        cityArr = upcomingEvents[i].eventLocation.split(',');
        
        /*cityArr = upcomingEvents[i].eventLocation.split('_');
        
        for (let index = 0, j = cityArr.length; index < j; index++) {
          cityArr[index] = cityArr[index].charAt(0).toUpperCase() + cityArr[index].slice(1);
        }*/

        city = cityArr[0];
        //create dates for future-events page
        if (upcomingEvents[i].eventStartDate !== null && (upcomingEvents[i].eventStartDate.getMonth() !== 0/* && upcomingEvents[i].eventStartDate.getDate() !== 1*/) ) {
          eventDates = `${months[upcomingEvents[i].eventStartDate.getMonth()]} ${upcomingEvents[i].eventStartDate.getDate()} - ${upcomingEvents[i].eventEndDate.getDate()}, ${upcomingEvents[i].eventEndDate.getFullYear()}`;
          eventMonth = months[upcomingEvents[i].eventStartDate.getMonth()];
        } else if (upcomingEvents[i].eventStartDate !== null && (upcomingEvents[i].eventStartDate.getMonth() === 0 && upcomingEvents[i].eventStartDate.getDate() === 1)) {
          eventDates = `${upcomingEvents[i].eventEndDate.getFullYear()}`;
          eventMonth = '';
        } else {
          eventDates = 'TBD';
          eventMonth = '';
        }
        //make dates for header
        if (upcomingEvents[i].eventStartDate === null) {
          startYear = 'TBD';
        } else {
          startYear = new Date(upcomingEvents[i].eventStartDate).getFullYear();
        }

        eventObj.eventDates = eventDates;
        eventObj.headerEventDates = eventMonth ? eventMonth + ', ' + startYear : startYear;
        eventObj.startYear = startYear;
        eventObj.city = city;
        eventObj.eventLocation = upcomingEvents[i].eventLocation;
        eventObj.eventTechnicalTopics = upcomingEvents[i].eventTechnicalTopics;
        eventObj.colNum = Math.floor(12 / upcomingEvents.length);
        eventObj.eventName = upcomingEvents[i].eventName;
        eventObj.eventUrl = upcomingEvents[i].eventUrl;
        eventObj.eventHighlightColor = continentColors[upcomingEvents[i].eventContinent];
        eventObj.eventHeaderImage = upcomingEvents[i].eventHeaderImage;
        eventObj.showOnHeader = upcomingEvents[i].showOnHeader;
        eventObj.eventRegistrationLink = upcomingEvents[i].eventRegistrationLink;
        eventObj.eventStartDate = upcomingEvents[i].eventStartDate;
        eventObj.eventEndDate = upcomingEvents[i].eventEndDate;
        eventObj.eventLanguage = upcomingEvents[i].eventLanguage;


        outputArr.push(eventObj)
      }
      // console.log(outputArr)
      res.json(outputArr);
    })
  })

   //route to post survey questions
   router.post('/survey', (req, res, next) => {
    models.sql.sync()
    .then(function() {
      return Surveys.create({
        eventName: 'Redmond Plugfest 2017',
        name: req.body.name,
        organization: req.body.organization,
        questionOneEvent: req.body.eventRating,
        questionOneVenue: req.body.venue,
        questionOneFood: req.body.food,
        questionOneNetworking: req.body.networking,
        questionTwoWindowsTalks: req.body.windowsTalks,
        questionTwoWindowsSpeakers: req.body.windowsSpeakers,
        questionTwoOfficeTalks: req.body.officeTalks,
        questionTwoOfficeSpeakers: req.body.officeSpeakers,
        questionTwoDataTalks: req.body.dataTalks,
        questionTwoDataSpeakers: req.body.dataSpeakers,
        questionsTwoDocumentation: req.body.documentation,
        questionThree: req.body.questionThree,
        questionFour: req.body.questionFour,
        questionFiveIOLab: req.body.IOLab,
        questionFiveSupportTeam: req.body.supportTeam,
        questionFiveTestTeam: req.body.testTeam,
        questionFiveProductTeam: req.body.productTeam,
        questionFiveNetwork: req.body.network,
        questionFiveTestSuite: req.body.testSuite,
        questionSix: req.body.questionSix,
        questionSeven: req.body.questionSeven,
        MSSMB12: req.body.MSSMB23,
        MSFSRVP: req.body.MSFSRVP,
        MSSWN: req.body.MSSWN,
        MSDFSC: req.body.MSDFSC,
        MSRSVD: req.body.MSRSVD,
        MSFSA: req.body.MSFSA,
        MSSQOS: req.body.MSQOS,
        MSADA: req.body.MSADA,
        MSADSC: req.body.MSADSC,
        MSADLS: req.body.MSADLS,
        MSADTS: req.body.MSADTS,
        MSAPDS: req.body.MSAPDS,
        MSDRSR: req.body.MSDRSR,
        MSFRS2: req.body.MSFRS2,
        MSLSAD: req.body.MSLSAD,
        MSLSAT: req.body.MSLSAT,
        MSNRPC: req.body.MSNRPC,
        MSSAMR: req.body.MSSAMR,
        MSKILE: req.body.MSKILE,
        MSPAC: req.body.MSPAC,
        MSKKDCP: req.body.MSKKDCP,
        MSDVRD: req.body.MSDVRD,
        MSDVRJ: req.body.MSDVRJ,
        MSOAPX: req.body.MSOAPX,
        MSECS: req.body.MSECS,
        MSADFSPIP: req.body.MSADFSPIP,
        MSMDM: req.body.MSMDM,
        MSMDE: req.body.MSMDE,
        MSSMBD: req.body.MSSMBD,
        others: req.body.other,
        // questionEight: req.body.MSSMB12 || req.body.MSFSRVP || req.body.MSSWN || req.body.MSDFSC || req.body.RSVD || req.body.MSFSA || req.body.MSSQOS || req.body.MSADA || req.body.MSADSC, 
        questionNine: req.body.questionNine,
        questionTen: req.body.questionTen,
        ipAddress: req.headers['x-forwarded-for'] || 
          req.connection.remoteAddress || 
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress
      })
      
      // .catch( (err) => {
      //   let errorMsg = ``;
      //   for (let i =0, j = err.errors.length; i < j; i++) {
      //     errorMsg += err.errors[i].message + `\n`;
      //   }
      //   res.status(500).send(errorMsg);
      // })
    })
  })

  router.get('/published-past-events', (req, res) => {
    models.sql.sync()
    .then( () => {
      return Event.findAll({
        where: {
          eventEndDate: {
            $and: {
              $lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
              $gte: new Date('2016-01-01')
            }
          },
          isPublished: true
        }
      })
      .then( (pastEvents) => {
        let outputObj = {};
        let eventNames = [];
        for (let i = 0, len = pastEvents.length; i < len; i++) {
          let eventYear = pastEvents[i].eventEndDate.getFullYear();
          if (!outputObj.hasOwnProperty(eventYear) ) {
            eventNames.unshift( pastEvents[i].eventName);
            let eventsArr = [{
              eventName: pastEvents[i].eventName,
              eventUrl: pastEvents[i].eventUrl,
              eventStartDate: pastEvents[i].eventStartDate,
              eventEndDate: pastEvents[i].eventEndDate,
              eventTechnicalTopics: pastEvents[i].eventTechnicalTopics,
              eventLocation: pastEvents[i].eventLocation
            }];
            outputObj[eventYear] = eventsArr;
          } else if (outputObj.hasOwnProperty(eventYear) && eventNames.indexOf( pastEvents[i].eventName) < 0) {
            eventNames.push( pastEvents[i].eventName);
            outputObj[eventYear].unshift({
              eventName: pastEvents[i].eventName,
              eventUrl: pastEvents[i].eventUrl,
              eventStartDate: pastEvents[i].eventStartDate,
              eventEndDate: pastEvents[i].eventEndDate,
              eventTechnicalTopics: pastEvents[i].eventTechnicalTopics,
              eventLocation: pastEvents[i].eventLocation
            });
          }
        }
        res.json(outputObj);
      });
    });
  });

   /*Get published events from URL path/slug to display and either send the event if there is one or set isEvent to false to show 404 page THIS ROUTE MUST BE LAST */
   router.route('/:slug')
   .get( (req, res) => {
     //create an eventInfo object to hold the values for the event to be rendered
     let eventInfo = {};
     eventInfo.isEvent = true;
     models.sql.sync()
     .then( () => {
 
       // search the database for event that matches the city and occurs on or after the year from the params and return the event found
       return Event.findOne({
         where: {
           eventUrl: req.params.slug,
           isPublished: true
         }
       });
 
     })
     //get the related tabs and speakers for the event and add them to the return object
     .then( (event) => {
       if (!event) {
         eventInfo.isEvent = false;
         res.json(eventInfo);
       } else {
         eventInfo.event = event;
         event.getEventTabs({
           where: {
             isPublished: true
           }
         })
         .then( (tabs) => {
           eventInfo.tabs = tabs;
           event.getSpeakers({
             where: {
               isPublished: true
             }
           })
           .then( (speakers) => {
             eventInfo.speakers = speakers;
             res.json(eventInfo);
           });
         });
         
       }
     });
   });

}