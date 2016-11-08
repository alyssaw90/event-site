'use strict';
/*global interests */
/*global SpeakersSuggestedCity */

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
const eatAuth = require('../scripts/eat_auth')(process.env.SECRET_KEY);
const models = require('../models');
const User = models.User;
const Speaker = models.Speaker;
const Event = models.Event;
const EventTab = models.EventTab;
const Slideshow = models.Slideshow;
const Slide = models.Slide;
const placeholders = require('../models/placeholders');
const dbRelationships = require('../models/relationships');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  autoFiles: true,
  uploadDir: 'uploads/'
});
/*Use the methods below to create the placeholder data. First uncomment the placeholder() and start the server this will create the data in the database, then comment out the placeholder() and uncomment the dbRelationships() and restart the server, this will create the relationships between the data tables. Finally, comment both placeholder() and dbRelationships out and restart the server. At this point, all your placeholder data will be created. Do this only once, if you need to recreate your placeholder data, delete all the tables from the database and repeat these same steps*/
// placeholders();
// dbRelationships();

function isLoggedIn(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();    	
  }

  // if they aren't send not authorized
  res.status('401').json({err: 'not authorized'});
}

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
                $eq: null,
                /* jshint ignore:start */
                $eq: new Date(new Date().getFullYear().toString())
                /* jshint ignore:end */
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
        eventObj.colNum = Math.floor(12 / upcomingEvents.length);
        eventObj.eventName = upcomingEvents[i].eventName;
        eventObj.eventUrl = upcomingEvents[i].eventUrl;
        eventObj.eventHighlightColor = continentColors[upcomingEvents[i].eventContinent];
        eventObj.eventHomepageImage = upcomingEvents[i].eventHomepageImage;
        eventObj.showOnHeader = upcomingEvents[i].showOnHeader

        outputArr.push(eventObj)
      }

      res.json(outputArr);
    })
  })


  //route to send Bing Map API key to front end
  router.route('/bingmapkey')
  .get( (req, res) => {
    res.json(process.env.BING_MAP_API_KEY);
  });


  //get all events for edit events tab
  router.get('/mapevents', (req, res) => {
    models.sql.sync()
      .then( () => {
        return Event.findAll({
          where: {
            eventLocation: {
              $not: null
            },
            isPublished: true
          }
        });
      })
      .then( (events) => {
        res.json(events);
      });
  });  

  //get published past events for past events page
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

  //route to get all files and delete files
  router.get('/files', isLoggedIn, (req, res) => {
    fs.readdir('uploads/', (err, data) => {
      if (err) {
        console.log(clc.white.bgRed('Error: '), err);
      }
      let outputArr = [];
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i] !== '.gitignore') {
          outputArr.push(data[i]);
        }
      }
      res.json(outputArr);
    })
  })

  router.post('/files', (req, res) => {
    let filesToDelete = [];
    for (let key in req.body) {
      if (req.body[key]) {
        filesToDelete.push(key);
      }
    }

    fs.readdir('uploads/', (err, data) => {
      if (err) {
        console.log(err);
      }
      for (let i = 0, len = data.length; i < len; i++) {
        if (filesToDelete.indexOf(data[i]) > -1) {
          fs.unlink('uploads/' + data[i]);
        }
      }
    })
    res.end();
  })

  //route to send slides related to a slidesho
  router.get('/slideshow/:slideName', (req, res) => {
    models.sql.sync()
    .then( () => {
      return Slideshow.findOne({
        where: {
          slideshowName: req.params.slideName
        }
      });
    })
    .then( (slideshowData) => {
      return slideshowData.getSlides();
    })
    .then( (slides) => {
      res.json(slides);
    })
  });
  //route to get all slides
  router.get('/allslides', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      return Slide.findAll();
    })
    .then( (slides) => {
      res.json(slides);
    })
  });

  //route to set homepage slides
  router.post('/sethomepageslides', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      return Slideshow.findOne({
        where: {
          slideshowName: 'homepageSlideshow'
        }
      });
    })
    .then( (slideshow) => {
      models.sql.sync()
      slideshow.setSlides([])
      .then( () => {
        models.sql.sync()
        .then( () => {
          for (let i = 0, len = req.body.length; i < len; i++) {
            slideshow.addSlide(req.body[i].id, {sortPosition: i});
          }
          res.end();
          
        });
      });
    });
  });

  router.post('/addslide', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      Slide.create({
        imgSrcUrl: req.body.imgSrcUrl,
        imgDestUrl: req.body.imgDestUrl,
        title: req.body.title,
        altText: req.body.altText
      })
      res.end('slide saved');
    });
  });

  router.post('/deleteslide', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then(() => {
      return Slide.destroy({
        where: {
          id: {
            $in: req.body
          }
        }
      });      
    })
    .then(() => {
      res.status('200').end();
    })
    .error( () => {
      res.status('501').end();
    })
  });

  //verify login
  router.get('/user/checklogin', isLoggedIn, (req, res) => {
    res.json(req.session);
  });

  //get all speakers for editing
  router.get('/speakers', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      Speaker.findAll()
      .then( (data) => {
        res.json(data);
      });
    });
  });

  //get all events for edit events tab
  router.get('/allevents', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      return Event.findAll();
    })
    .then( (events) => {
      res.json(events);
    });
  });

  //route for uploading files
  router.post('/multer', multipartMiddleware, (req, res) => {
    let tmpFilename = req.files.file.path.slice(8);
    let newFilename = req.files.file.size + '-' + req.files.file.originalFilename;
    fs.readdir('uploads/', (err, data) => {
      for (let i = 0, len = data.length; i < len; i++) {
  
        if (data[i] === tmpFilename) {
          fs.rename('uploads/' + data[i], 'uploads/' + newFilename, () => {});
        }
  
      }
    })
    res.end('File uploaded.');
  });

  //route for uploading files with tinymce
  router.post('/tinymceUpload', isLoggedIn, (req, res) => {
    let imageBuffer = new Buffer(req.body.base64String, 'base64');
    fs.writeFile(`uploads/${req.body.fileName}`, imageBuffer, (err) => {
      res.end('file saved');
    });
  });

  // create new event
  router.post('/createevent', isLoggedIn, (req, res, next) => {
    models.sql.sync()
    .then(function () {
      Event.create({
        eventName: req.body.newEventName,
        eventUrl: req.body.eventUrl,
        eventRegistrationLink: req.body.newEventRegistrationLink,
        eventStartDate: req.body.newEventStartDate,
        eventEndDate: req.body.newEventEndDate,
        eventLocation: req.body.newEventCity,
        eventHeaderImage: req.body.newEventHeaderImage,
        eventContinent: req.body.newEventContinent,
        isPublished: req.body.publishStatus,
        showOnHeader: req.body.showOnHeader,
        eventAboutTabText: req.body.eventAboutTabText,
        eventVenueName: req.body.newEventVenueName,
        eventVenueAddress: req.body.newVenueAddress,
        eventParkingInfo: req.body.newVenueParkingInfo,
        eventVenueImg: req.body.newEventVenueImg,
        eventTechnicalTopics: req.body.eventTechnicalTopics
      })
      .catch( (err) => {
        next(new Error(err.errors));
      })
      .then( (newEvent) => {
        models.sql.sync()
        .then( () => {
          let speakersArr = [];
          for (let i = 0, len = req.body.speakers.length; i < len; i++) {
            newEvent.addSpeaker(req.body.speakers[i].id, {sortPosition: req.body.speakers[i].eventPosition});            
          }
          
          res.json(newEvent);
          
        })

      });
    });
  });

  router.post('/editevent', isLoggedIn, (req, res, next) => {
    models.sql.sync()
    .then( () => {
      return Event.findOne({
        where: {
          id: req.body.event.id 
        }
      })
    })
    .then( (event) => {
      event.update({
        showOnHeader: req.body.event.showOnHeader,
        isPublished: req.body.event.isPublished,
        eventName: req.body.event.eventName,
        eventUrl: req.body.event.eventUrl,
        eventRegistrationLink: req.body.event.eventRegistrationLink,
        eventStartDate: req.body.event.eventStartDate,
        eventEndDate: req.body.event.eventEndDate,
        eventCountry: req.body.event.eventCountry,
        eventHeaderImage: req.body.event.eventHeaderImage,
        eventContinent: req.body.event.eventContinent,
        eventAboutTabText: req.body.event.eventAboutTabText,
        eventVenueName: req.body.event.eventVenueName,
        eventVenueAddress: req.body.event.eventVenueAddressLine1,
        eventParkingInfo: req.body.event.eventParkingInfo,
        eventVenueImg: req.body.event.eventVenueImg,
        eventTechnicalTopics: req.body.eventTechnicalTopics,
        eventLanguage: req.body.newEventLanguage
      })
      res.end();
    })
  });

  router.post('/edittab', isLoggedIn, (req, res, next) => {
    models.sql.sync()
    .then( () => {
      return EventTab.findOne({
        where: {
          id: req.body.id
        }
      })
    })
    .then( (tab) => {
      if (typeof req.body.tabContent === 'string') {
        tab.tabContent = req.body.tabContent;
      }
      tab.tabTitle = req.body.tabTitle,
      tab.isPublished = req.body.isPublished
      tab.save()
      .then((newTab) => {
        res.end();
      });
    });
  });

  router.post('/newtaborder', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      return EventTab.findAll({
        where: {
          id: {
            $in: req.body
          }
        }
      })
    })
    .then( (tabs) => {
      tabs.forEach( (tab) => {
        let tabId = tab.id.toString();

        for (let i = 0, j = req.body.length; i < j; i++) {
      console.log(clc.green.bgWhite(' ::::  '), tab.id,  ':: ', tab);
          if (req.body[i] === tabId) {
            tab.update({
              tabNumber: i
            })
          }
        }
      });
      res.end();
    })
  })

  router.post('/addtab', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      return EventTab.create({
        tabNumber: req.body.newTabNumber,
        tabTitle: req.body.newTabTitle,
        tabContent: req.body.newTabContent,
        isPublished: req.body.isPublished
      })
    })
    .then( (newTab) => {
      models.sql.sync()
      .then( () => {
        return Event.findOne({
          where: {
            id: req.body.eventId
          }
        })
      })
      .then( (event) => {
        event.addEventTab(newTab.dataValues.id);
        res.end();
      });
    });
  });

  router.delete('/deletetab/:slug', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      return EventTab.findOne({
        where: {
          id: req.params.slug
        }
      })
    })
    .then( (tab) => {
      tab.destroy();
      res.end();
    })
  })

  router.post('/editeventspeakers', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      return Event.findOne({
        where: {
          id: req.body.event.id
        }
      })
    })
    .then( (event) => {
      for (let i = 0, len = req.body.speakers.length; i < len; i++) {
        event.addSpeaker(req.body.speakers[i].id, {sortPosition: i});
      }
      res.end();
    });
  });

  //route to create speakers
  router.post('/addspeakers', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      let speakerEmail = req.body.newMsTeamEmail ? req.body.newMsTeamEmail : 'plugfests@microsoft.com';
      // let speakerHeadshot = req.body.headshot ? req.body.headshot : 'placeholder-headshot.jpg';
      Speaker.create({
        firstName: req.body.newFirstName,
        lastName: req.body.newLastName,
        email: speakerEmail,
        speakerDescription: req.body.newSpeakerDescription,
        showOnMeetTheTeamPage: req.body.showOnMeetTheTeamPage,
        meetTheTeamPageOrder: req.body.meetTheTeamPageOrder,
        msTeamTitle: req.body.newMsTeamTitle,
        headShot: req.body.headshot,
        isPublished: req.body.publishStatus
      });
      res.end();
    });
  });
  //route to edit speakers
  router.post('/editspeaker', isLoggedIn, (req, res) => {
    models.sql.sync()
    .then( () => {
      return Speaker.findOne({
        where: {
          id: req.body.id
        }
      })
    })
    .then( (speaker) => {
      let speakerEmail = req.body.email ? req.body.email : 'plugfests@microsoft.com';
      speaker.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: speakerEmail,
        speakerDescription: req.body.speakerDescription,
        showOnMeetTheTeamPage: req.body.showOnMeetTheTeamPage,
        meetTheTeamPageOrder: req.body.meetTheTeamPageOrder,
        msTeamTitle: req.body.msTeamTitle,
        headShot: req.body.headShot,
        isPublished: req.body.isPublished
      })
    })
    .then( () => {
      res.end();
    });
  });
  
    //show all images
  router.get('/showimages', isLoggedIn, function(req, res) {
    fs.readdir('uploads', function(err, files) {
      let imagesArr = [];
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      }

      for (let i = 0, j = files.length; i < j; i ++) {
        if (files[i] !== '.gitignore') {
          imagesArr.push({title: files[i], value: '/uploads/' + files[i]});
        }
      }
      res.json(imagesArr);
    });
  });

  /*Get events including unpublished content from URL path/slug */
  router.route('/fulllist/:slug')
  .get(isLoggedIn, (req, res) => {
    //create an eventInfo object to hold the values for the event to be rendered
    let eventInfo = {};
    eventInfo.isEvent = true;
    models.sql.sync()
    .then( () => {
      // search the database for event that matches the city and occurs on or after the year from the params and return the event found
      return Event.findOne({
        where: {
          eventUrl: req.params.slug,
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
        event.getEventTabs()
        .then( (tabs) => {
          eventInfo.tabs = tabs;
          event.getSpeakers()
          .then( (speakers) => {
            eventInfo.speakers = speakers;
            res.json(eventInfo);
          });
        });        
      }
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


};
