// API routes for consumer facing portion of the site and the admin portal
// I would like to separate the routes into consumer facing routes file and admin portal routes file

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
const userLogging = require(`../scripts/userLogging`)();
const isLoggedIn = userLogging.isLoggedIn;
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
/*Use the methods below to create the placeholder data. First uncomment the placeholder() and start the server this will 
create the data in the database, then comment out the placeholder() and uncomment the dbRelationships() and restart the server, 
this will create the relationships between the data tables. Finally, comment both placeholder() and dbRelationships out and restart the
 server. At this point, all your placeholder data will be created. Do this only once, if you need to recreate your placeholder data, 
 delete all the tables from the database and repeat these same steps*/
// placeholders();
// dbRelationships();

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


  //route to get all files and delete files
  router.get('/files', (req, res) => {
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
  //get all speakers for editing
  router.get('/speakers',  (req, res) => {
    models.sql.sync()
    .then( () => {
      Speaker.findAll()
      .then( (data) => {
        res.json(data);
      });
    });
  });

  //get all events for edit events tab
  router.get('/allevents',  (req, res) => {
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
  router.post('/tinymceUpload',  (req, res) => {
    let imageBuffer = new Buffer(req.body.base64String, 'base64');
    fs.writeFile(`uploads/${req.body.fileName}`, imageBuffer, (err) => {
      res.end('file saved');
    });
  });

  // create new event
  router.post('/createevent',  (req, res, next) => {
    // let userName = req.user.unique_name || req.user.email;
    // console.log(req.user.sub)
    models.sql.sync()
    .then(function () {
      return Event.create({
        lastModifiedBy: req.body.lastModifiedBy,
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
        eventTechnicalTopics: req.body.eventTechnicalTopics,
        eventAccommodations: req.body.eventAccommodations,
        eventHackathon: req.body.eventHackathon,
        eventIOLab: req.body.eventIOLab,
        eventWorkshop: req.body.eventWorkshop,
        eventAgenda: req.body.eventAgenda,
        eventAccommodationImg: req.body.newEventAccommodationImg,
        eventHackathonImg: req.body.newEventHackathonImg,
        eventWorkshopImg: req.body.newEventWorkshopImg,
        eventIOLabImg: req.body.newEventIOLabImg,
        eventVenueInfo: req.body.newEventVenueInfo, 
        eventPreReqs: req.body.eventPreReqs
      })
      .catch( (err) => {
        console.log(err)
        let errorMsg = ``;
        // for (let i =0, j = err.errors.length; i < j; i++) {
        //   errorMsg += err.errors[i].message + `\n`;
        // }
        res.status(500).send(errorMsg);
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

// route to edit event in admin portal event section
  router.post('/editevent',  (req, res, next) => {
    console.log(clc.red(req.body.event.showOnHeader))
    models.sql.sync()
    .then( () => {
      return Event.findOne({
        where: {
          id: req.body.event.id 
        }
      })
    })
    .then( (event) => {
      // let userName = req.user.unique_name || req.user.email;
      return event.update({
            lastModifiedBy: req.body.event.lastModifiedBy,
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
            eventLocation: req.body.event.eventLocation,
            eventAboutTabText: req.body.event.eventAboutTabText,
            eventVenueName: req.body.event.eventVenueName,
            eventVenueAddress: req.body.event.eventVenueAddressLine1,
            eventParkingInfo: req.body.event.eventParkingInfo,
            eventVenueImg: req.body.event.eventVenueImg,
            eventTechnicalTopics: req.body.eventTechnicalTopics,
            eventLanguage: req.body.newEventLanguage,
            eventAccommodations: req.body.event.eventAccommodations,
            eventHackathon: req.body.event.eventHackathon,
            eventIOLab: req.body.event.eventIOLab,
            eventWorkshop: req.body.event.eventWorkshop,
            eventAgenda: req.body.event.eventAgenda,
            eventAccommodationImg: req.body.event.eventAccommodationImg,
            eventHackathonImg: req.body.event.eventHackathonImg,
            eventWorkshopImg: req.body.event.eventWorkshopImg,
            eventIOLabImg: req.body.event.eventIOLabImg,
            eventVenueInfo: req.body.event.eventVenueInfo,
            eventPreReqs: req.body.event.eventPreReqs
      })
      .then((updatedEvent) => {
        res.end(updatedEvent.eventUrl);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({msg: `there was a problem updating your event`});
      })
    })
  });

// route to delete event on admin portal event page
  router.delete(`/deleteevent/:slug`,  (req, res) => {
    models.sql.sync()
    .then(() => {
      return Event.findOne({
        where: {
          id: req.params.slug
        }
      })
    })
    .then((event) => {
      event.destroy();
      res.end();
    })
    .catch((err) => {
      res.json(err);
    })
  })

// route to edit event tabs
  router.post('/edittab',  (req, res, next) => {
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
        res.json(newTab);
      });
    });
  });

// route to edit tab order for events
  router.post('/newtaborder',  (req, res) => {
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

// route to add a tab to event
  router.post('/addtab',  (req, res) => {
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

// route to delete a tab from events
  router.delete('/deletetab/:slug',  (req, res) => {
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

// route to edit speakers on events
  router.post('/editeventspeakers',  (req, res) => {
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
  router.post('/addspeakers',  (req, res) => {
    models.sql.sync()
    .then( () => {
      // let userName = req.user.unique_name || req.user.email;
      let speakerEmail = req.body.newMsTeamEmail ? req.body.newMsTeamEmail : 'plugfests@microsoft.com';
      // let speakerHeadshot = req.body.headshot ? req.body.headshot : 'placeholder-headshot.jpg';
      Speaker.create({
        lastModifiedBy: req.body.lastModifiedBy,
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
  router.post('/editspeaker',  (req, res) => {
    models.sql.sync()
    .then( () => {
      return Speaker.findOne({
        where: {
          id: req.body.id
        }
      })
    })
    .then( (speaker) => {
      // let userName = req.user.unique_name || req.user.email;
      let speakerEmail = req.body.email ? req.body.email : 'plugfests@microsoft.com';
      return speaker.update({
        lastModifiedBy: req.body.lastModifiedBy,
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
    .then( (editedSpeaker) => {
      res.json(editedSpeaker);
    });
  });

  router.delete(`/deletespeaker/:slug`,  (req, res) => {
    models.sql.sync()
    .then(() => {
      return Speaker.findOne({
        where: {
          id: req.params.slug
        }
      })
    })
    .then( (speaker) => {
      speaker.destroy();
      res.end();
    })
  })
  
    //show all images
  router.get('/showimages',  function(req, res) {
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

};
