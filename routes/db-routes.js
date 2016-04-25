'use strict';
/*global interests */
/*global ContactsSuggestedCity */
require('dotenv').load();
let Contact = require('../models/Contact');
let Event = require('../models/Event');
let EventTab = require('../models/EventTab');
let EventImage = require('../models/EventImage');
let User = require('../models/User');
let fs = require('fs');
let clc = require('cli-color');
let multer = require('multer');
let storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});
let upload = multer({ storage: storage });
let bodyparser = require('body-parser');
let cookieParser = require('cookie-parser');
let path = require('path');
let eatAuth = require('../scripts/eat_auth')(process.env.SECRET_KEY);
let Sql = require('sequelize');
/*let sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
let sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});

/*let sql = new Sql(process.env.DB_DEV_NAME, process.env.DB_DEV_USER, process.env.DB_DEV_PASS, {
  host: process.env.DB_DEV_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});
*/
sql.authenticate()
  .then(function (err) {
    if (err) {
      console.log(clc.xterm(202)('Unable to connect to the database with db router: '), err);
    } else {
      console.log(clc.xterm(202)('Connection has been established successfully with db router.'));
    }
  });

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let continentColors = {'North America': 'ffb900', 'South America': '107c10', 'Africa': 'e81123', 'Asia': '0078d7', 'Europe': '5c2d91', 'Oceania': 'b4009e'};

function shuffle (arr) {
  let currentIndex = arr.length, tempVal, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tempVal = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tempVal;
  }

  return arr;
}

module.exports = function (router) {
  router.use(bodyparser.json());
  router.use(bodyparser.urlencoded({
    extended: true
  }));
  router.use(cookieParser());

  /*Begin basic view routes*/
  router.route('/')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });

  router.route('/about')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/about.html'));
  });

  router.route('/past-events')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/past-events.html'));
  });

  //route to return html for meet the team page
  router.route('/meet-the-team')
  .get(function(req, res) {
    //sync with the database and search for all speakers where showOnMeetTheTeamPage is true
    sql.sync()
    .then(function() {
      return Contact.findAll({
        where: {
          showOnMeetTheTeamPage: true
        }
      })
    })
    .then(function(speakers) {
      let meetTheTeamSpeakersArr = [];
      let meetTheTeamSpeakersHtml = '<main class="grid white-bg main-page-content the-team-section">';
      //loop over the returned speakers and splice them into an array using their position number minus one as the index
      for (let key in speakers) {
        meetTheTeamSpeakersArr.splice(speakers[key].meetTheTeamPageOrder - 1, 0, speakers[key]) 
      }
      //create the string of html to add to the page
      for (let i = 0, j = meetTheTeamSpeakersArr.length; i < j; i++) {
        meetTheTeamSpeakersHtml += '<section class="col_12 internetExplorer" id="' + meetTheTeamSpeakersArr[i].divId + '"><h4>' + meetTheTeamSpeakersArr[i].firstName + ' ' + meetTheTeamSpeakersArr[i].lastName + '</h4><h5>'+ meetTheTeamSpeakersArr[i].msTeamTitle + '</h5><p><img class="pull-left" src="../uploads/' + meetTheTeamSpeakersArr[i].headShot + '" />' + meetTheTeamSpeakersArr[i].contactDescription + '</p><hr class="alt1" /></section>';
      }
      //read in the meet-the-team.html page and add the speakers html then send the html string
      fs.readFile(path.join(__dirname, '../views/meet-the-team.html'), function(err, speakersPage) {
        let speakersPageHtml = speakersPage.toString();
        speakersPageHtml = speakersPageHtml.replace('<main class="grid white-bg main-page-content the-team-section">', meetTheTeamSpeakersHtml);
        res.send(speakersPageHtml);
      });
    });
  });

  router.route('/contactus')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
  });

  router.route('/faq')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/faq.html'));
  });

  router.route('/latest-news')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/latest-news.html'));
  });

  router.get('/curriculum', eatAuth, function(req, res) {
    res.sendFile(path.join(__dirname, '../views/curriculum.html'));
  });

  router.route('/survey/:eventId')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/survey.html'));
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
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      });
    });
  });

  router.get('/private', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  });

  router.get('/admin', eatAuth, function(req, res) {
    if (req.cookies.interopAdmin === 'true') {
      res.sendFile(path.join(__dirname, '../views/admin.html'));
    } else {
      res.sendFile(path.join(__dirname, '../views/curriculum.html'));
    }
  });

  router.route('/thankyou')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, '../views/loggedout.html'));
  });

  //find all events that are upcoming and add the next 3 upcoming events to the future-events page
  router.route('/future-events')
  .get(function (req, res) {
    let eventBlocksHtml = '<main class="events grid"><section class="col_12 internetExplorer">';
    let newHtml = '';
    let colNum = 4;
    let numFutureBlocks = 4;
    fs.readFile(path.join(__dirname, '../views/future-events.html'), function (err, html) {
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      }
      sql.sync()
      .then(function () {
        Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
        .then(function (upcomingEvent) {
          if (upcomingEvent.length < 4) {
            numFutureBlocks = upcomingEvent.length;
          }
          upcomingEvent.sort(function (a, b) {
            a = new Date(a.eventStartDate);
            b = new Date(b.eventStartDate);
            if ( a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            if (a === b) {
              return 0;
            }
          });
          for (let i = 0; i < numFutureBlocks; i++) {
            let risingText = '';
            eventBlocksHtml += '<div class="col_' + 12 / numFutureBlocks + ' event_block" style="background-color: #' + continentColors[upcomingEvent[i].eventContinent] + ';"><a href="/' + upcomingEvent[i].eventUrl + '"><p>More Details</p><h1>' + upcomingEvent[i].eventLocation + '</h1><h3>' + upcomingEvent[i].eventName + '<br />' + months[upcomingEvent[i].eventStartDate.getMonth()] + ' ' + upcomingEvent[i].eventStartDate.getDate() + ' - ' + upcomingEvent[i].eventEndDate.getDate() + ', ' + upcomingEvent[i].eventEndDate.getFullYear() + '</h3></a>' + risingText + '</div>';
          }
          eventBlocksHtml += '</section>';
          newHtml = html.toString().replace('<main class="events grid">', eventBlocksHtml);
          res.send(newHtml);
        });
      });
    });
  });

  //route to send events for header
  router.route('/events')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Event.findAll({where: {eventEndDate: {$gte: new Date()}}})
      .then(function (data) {
        let eventArr = [];
        let menuEvents = 4;
        if (data.length < 4) {
          menuEvents = data.length;
        }
        data.sort(function (a, b) {
          a = a.eventStartDate;
          b = b.eventStartDate;
          if ( a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          if (a === b) {
            return 0;
          }
        });
        for (let i = 0; i < menuEvents; i++) {
          let tmpObj = {
            eventStartDate: data[i].eventStartDate,
            eventUrl: data[i].eventUrl,
            eventLocation: data[i].eventLocation,
            eventHomepageImage: data[i].eventHomepageImage,
            eventHighlightColor: data[i].eventHighlightColor
          };
          eventArr.push(tmpObj);
        }
        res.json(eventArr);
      });
    });
  });
  

  /*/////////////////////////////////////////////////////////////////////////////////////////


               ********The Routes below are for event Creation******


  /////////////////////////////////////////////////////////////////////////////////////////*/

  //create basic event
  router.post('/createevent', eatAuth, upload.array('images', 2), function (req, res, next) {
    sql.sync()
    .then(function () {
      Event.create({
        eventName: req.body.newEventName,
        eventStartDate: req.body.newEventStartDate,
        eventEndDate: req.body.newEventEndDate,
        eventLocation: req.body.newEventLocation,
        eventHeaderImage: req.files[0].filename,
        eventHomepageImage: req.files[1].filename,
        eventContinent: req.body.newEventContinent,
        eventLocation: req.body.newEventLocation,
        eventHighlightColor: req.body.newEventColor
      })
      .then(function(newEvent) {
        // console.log(clc.bgGreen('   ::::::    '), newEvent.eventName);
        res.json(newEvent.id);
      })
      // console.log(clc.bgRed('    ::::::   '), req.body.speakersInput);
    });
  });

  //Find an event with the id from req.body.eventId and add the string of speakers then save
  router.post('/addspeakers', eatAuth, function(req, res, next) {
    sql.sync()
    .then(function() {
      return Event.findOne({where: {id: req.body.eventId}})
    })
    .then(function(thisEvent) {
      thisEvent.eventSpeakers = req.body.speakers;
      thisEvent.save().then(function() {});
    });
  });

  //create a tab with data from req.body
  router.post('/addtabs', eatAuth, function(req, res, next) {
    sql.sync()
    .then(function() {
      EventTab.create({
        eventId: req.body.eventId,
        tabNumber: req.body.tabNumber,
        tabTitle: req.body.tabTitle,
        tabContent: req.body.tabContent
      })
      res.end();
    });
  });

  //show all images
  router.get('/showimages', eatAuth, function(req, res) {
    fs.readdir(path.join(__dirname, '../uploads'), function(err, files) {
      let outputHtml = '';
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      }

      for (let i = 0, j = files.length; i < j; i ++) {
        if (files[i] !== '.gitignore') {
          outputHtml += '<img class="imageToInsert" style="height: 50px; margin: 10px 10px 10px 10px" data-clipboard-text="/uploads/' + files[i] + '" src="/uploads/' + files[i] + '" />';
        }
      }
      outputHtml += '<script type="text/javascript">$(".imageToInsert").click(function() {$(this).toggleClass("animated shake");})'
      res.send(outputHtml);
    });
  });
  
  //add an image from req.body
  router.post('/addimage', eatAuth, upload.single('images'), function (req, res, next) {
    if (req.body.eventId) {
      sql.sync()
      .then(function() {
        return Event.findOne({where: {id: req.body.eventId}});
      })
      .then(function(data) {
        var key = req.body.whatToChange;
        data[key] = req.file.filename;
        data.save()
        res.end();
      })
      
    }
  });
  //get all events for edit events tab
  router.get('/allevents', function(req, res) {
    sql.sync()
    .then(function() {
      return Event.findAll();
    })
    .then(function(events) {
      res.json(events);
    })
  })

/*  router.route('/eventTabs')
  .get(function(req, res) {
    sql.sync()
    .then(function() {
      EventTab.findAll()
      .then(function(data) {
        res.json(data);
      });
    });
  });*/

  //route to return event tab being searched
  router.post('/eventTabs', eatAuth, function(req, res) {
    sql.sync()
    .then(function() {
      EventTab.findOne({where: {id: req.body.tabId}})
      .then(function(data) {
        let tabObj = {
          tabContent: data.tabContent,
          tabNumber: data.tabNumber,
          tabTitle: data.tabTitle,
          tabId: data.id,
          eventId: data.eventId
        }
        res.json(tabObj);
      });
    });
  });

  //search for a tab with the id from req.body.tabId and replace the data with the submitted data
  router.post('/edittab', eatAuth, function(req, res) {
    sql.sync()
    .then(function() {
      return EventTab.findOne({where: {id: req.body.tabId}})
    })
    .then(function(tab) {
      if (req.body.tabNumber) {
        tab.tabNumber = req.body.tabNumber;
      }
      if (req.body.tabTitle) {
        tab.tabTitle = req.body.tabTitle;
      }
      if (req.body.tabContent) {
        tab.tabContent = req.body.tabContent;
      }
      tab.save();
      res.end();
    });
  });

  //find the searched for event and return the html form to edit it
  router.post('/findeventtoedit', eatAuth, function(req, res) {
    //create object to hold html to be sent to the DOM
    let editEventHtml = {};
    //create an eventInfo object to hold the values for the event to be rendered
    let eventInfo = {};
    eventInfo.eventUrl = req.body.eventUrl;
    //sync with the database
    sql.sync()
    .then(function() {
      //trim the params to get the city and the year of the event
      let eventSearchCity = req.body.eventUrl.slice(0, -4);
      let eventYear = req.body.eventUrl.slice(-4);
      let testDate = new Date(eventYear - 1, 11, 31, 11, 59, 59);
      // search the database for event that matches the city and occurs on or after the year from the params and return the event found
      return Event.findOne({
        where: {
          eventLocation: eventSearchCity,
          eventStartDate: {$gte: testDate}
        }
      });
    })
    .then(function(theEvent) {
      eventInfo.theEvent = theEvent;
      return EventTab.findAll({
        where: {
          eventId: theEvent.id
        }
      })
    })
    .then(function(tabs) {
      eventInfo.tabs = tabs;
      //split the speaker IDs into an array then search for all Contacts that haver an ID that appears in the array and return the result
      let speakersArr = eventInfo.theEvent.eventSpeakers.split(',');
      return Contact.findAll({
        where: {
          id: {$in: speakersArr}
        }
      })
    })
    .then(function(speakers) {
      let tabForm = `<form action="/eventTabs" id="editEventTabs">`;
      //create an array and push each speaker object into it with the needed values and add the array to the eventInfo object
      let speakersArr =  [];
      let i = 0;

      for (let key in speakers) {
        speakersArr[i] = {};
        speakersArr[i].firstName = speakers[key].firstName;
        speakersArr[i].lastName = speakers[key].lastName;
        speakersArr[i].msTeamTitle = speakers[key].msTeamTitle;
        speakersArr[i].headShot = speakers[key].headShot;
        speakersArr[i].contactDescription = speakers[key].contactDescription;
        i++;
      }

      for (let i = 0, j = eventInfo.tabs.length; i < j; i++) {
        tabForm += `<label for="chooseEventToEdit">${eventInfo.tabs[i].tabTitle}</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="chooseEventToEdit${i}" name="chooseEventToEdit" type="radio" value="${eventInfo.tabs[i].id}"></input></input>`;
      }
      tabForm += `<button class="medium" id="chooseTabToEditButton">Choose tab</button></form>`;
      eventInfo.speakers = speakersArr;
      editEventHtml.eventTabs = tabForm;
      editEventHtml.eventName = `<form action="/editevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a name</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="text" value="${eventInfo.theEvent.eventName}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" id="whatToChange" name="whatToChange" value="eventName"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventRegistrationLink = `<form action="/editevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a registraion link</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="text submit" value="${eventInfo.theEvent.eventRegistrationLink}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventRegistrationLink"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventLocation = `<form action="/editevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a new city</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="text submit" value="${eventInfo.theEvent.eventLocation}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventLocation"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventContinent = `<form action="/editevent" id="editEventForm" method="POST"><label class="col_4" for="editEventInput">The current continent is ${eventInfo.theEvent.eventContinent}</label><input type="radio" id="editEventInput" name="editEventInput" value="North America">North America</input><input type="radio" id="editEventInput" name="editEventInput" value="South America">South America</input><input type="radio" id="editEventInput" name="editEventInput" value="Africa">Africa</input><input type="radio" id="editEventInput" name="editEventInput" value="Asia">Asia</input><input type="radio" id="editEventInput" name="editEventInput" value="Europe">Europe</input><input type="radio" id="editEventInput" name="editEventInput" value="Oceania">Australia</input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventContinent"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventStartDate = `<form action="/editevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a new start date</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="date" value="${eventInfo.theEvent.eventStartDate}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventStartDate"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventEndDate = `<form action="/editevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a new end date</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="date" value="${eventInfo.theEvent.eventEndDate}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventEndDate"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventHeaderImage = `<form action="/addimage" id="editEventForm" method="POST" enctype="multipart/form-data"><label for="editEventInput">Choose a new event header image</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="images" type="file" value="${eventInfo.theEvent.eventHeaderImage}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventHeaderImage"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventHomepageImage = `<form action="/addimage" id="editEventForm" method="POST" enctype="multipart/form-data"><label for="editEventInput">Choose a new event header image</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="images" type="file" value="${eventInfo.theEvent.eventHomepageImage}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventHomepageImage"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventHighlightColor = `<form action="/editevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a color</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="color" value="${eventInfo.theEvent.eventHighlightColor}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" id="whatToChange" name="whatToChange" value="eventHighlightColor"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
      editEventHtml.eventSpeakers = `<form id="editSpeakerCount"><label for="newSpeakerCount">How many speakers will the event have?</label><input type="number" id="newSpeakerCount" name="newSpeakerCount"></input></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><button class="medium" id="newSpeakerCountButton" type="submit">Choose Speakers</button></form><form action="/editevent" id="newAddSpeakersForm" method="post" enctype="multipart/form-data"><input type="hidden" id="whatToChange" id="whatToChange" name="whatToChange" value="eventSpeakers"></input></form>`;
      res.json(editEventHtml);
    });

  });

  //find event and change the value that is sent in req.body.whatToChange
  router.post('/editevent', eatAuth, function(req, res) {
    sql.sync()
    .then(function() {
      return Event.findOne({where:{id: req.body.eventId}})
    })
    .then(function(eventToEdit) {
      let key = req.body.whatToChange;
      eventToEdit[key] = req.body.editEventInput;
      eventToEdit.save();
      res.end();
    })
  })


/*  router.route('/allevents/:eventId')
  .get(function (req, res) {
    let picsHtml = '<div class="col_12 gallery">';
    let returnObj = {};
    sql.sync()
    .then(function () {
      Event.findOne({where: {id: req.params.eventId}})
      .then(function (data) {
        fs.readdir(path.join(__dirname, '../uploads/' + data.eventUrl), function (err, files) {
          for (let key in files) {
            picsHtml += '<a href="../uploads/' + data.eventUrl + '/' + files[key] + ' rel="gallery" class="fancybox" type="image" ><img src="../uploads/' + data.eventUrl + '/' + files[key] + '" width="100" height="100" /></a>';
          }
          picsHtml += '</div>';
          // for (let i = 0, j = files.length; i < j; i++) {
          //   files[i] = '../uploads/' + data.eventUrl + '/' + files[i];
          // }
          let testHtml = '<div class="col_12 gallery"><a href="../uploads/shanghaiinteropdevdays2015-2026/_MG_3990.JPG" rel="gallery"><img src="../uploads/shanghaiinteropdevdays2015-2026/_MG_3990.JPG" width="100" height="100" /></a><a href="../uploads/shanghaiinteropdevdays2015-2026/_MG_4077.JPG" rel="gallery"><img src="../uploads/shanghaiinteropdevdays2015-2026/_MG_4077.JPG" width="100" height="100" /></a></div>';
          returnObj.eventUrl = data.eventUrl;
          returnObj.picsHtml = picsHtml;
          returnObj.files = files;
          res.json(returnObj);
        });
      });
    });
  });*/

  router.get('/contacts', eatAuth, function (req, res) {
    sql.sync()
    .then(function () {
      Contact.findAll()
      .then(function (data) {
        res.json(data);
      });
    });
  });
  
/*  router.route('/upcomingeventurls')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
      .then(function (data) {
        let theUrls = [];
        for (let i = 0; i < data.length; i++) {
          let tmpObj = {};
          tmpObj.url = data[i].eventUrl;
          tmpObj.eventName = data[i].eventName;
          theUrls.push(tmpObj);
        }
        res.json(theUrls);
      });
    });
  });*/

  //This route creates the html for the event pages. This route MUST be last
  router.route('/:eventUrl')
  .get(function(req, res) {
    //create an eventInfo object to hold the values for the event to be rendered
    let eventInfo = {};
    eventInfo.eventUrl = req.params.eventUrl;
    eventInfo.htmlContent = '';
    eventInfo.eventUltHtml = '<ul class="tabs left" id="eventTabLinks">';
    eventInfo.eventDivHtml = '';
    eventInfo.speakersHtml =  '';
    eventInfo.headerHtml = '';
    //sync with the database
    sql.sync()
    .then(function() {
      //trim the params to get the city and the year of the event
      let eventSearchCity = req.params.eventUrl.slice(0, -4);
      let eventYear = req.params.eventUrl.slice(-4);
      let testDate = new Date(eventYear - 1, 11, 31, 11, 59, 59);
      // search the database for event that matches the city and occurs on or after the year from the params and return the event found
      return Event.findOne({
        where: {
          eventLocation: eventSearchCity,
          eventStartDate: {$gte: testDate}
        }
      })
    })
    .then(function(theEvent) {
      //assign the event returned from the search to the event key of the eventInfo object
      eventInfo.event = theEvent;
    })
    .then(function() {
      // search for all the tabs that are associated with the current event
      return EventTab.findAll({
        where: {
          eventId: eventInfo.event.id
        }
      })
    })
    .then(function(theTabs) {
      console.log(clc.bgGreen.red('    :::::    '), theTabs);
      //assign the returned event tabs to the tabs key of the eventInfo object
      eventInfo.tabs = theTabs;
    })
    .then(function() {
      //split the speaker IDs into an array then search for all Contacts that haver an ID that appears in the array and return the result
      let speakersArr = eventInfo.event.eventSpeakers.split(',');
      return Contact.findAll({
        where: {
          id: {$in: speakersArr}
        }
      })
    })
    .then(function(theSpeakers) {
      //create an array and push each speaker object into it with the needed values and add the array to the eventInfo object
      let speakersArr =  [];
      let i = 0;
      for (let key in theSpeakers) {
        speakersArr[i] = {};
        speakersArr[i].firstName = theSpeakers[key].firstName;
        speakersArr[i].lastName = theSpeakers[key].lastName;
        speakersArr[i].msTeamTitle = theSpeakers[key].msTeamTitle;
        speakersArr[i].headShot = theSpeakers[key].headShot;
        speakersArr[i].contactDescription = theSpeakers[key].contactDescription;
        i++;
      }
      eventInfo.speakers = speakersArr;
      
      //if there are speakers in the speakers array
      if (eventInfo.speakers.length > 0) {
      //loop over the speakers array and create html for speakers tab
        for (let i = 0, j = eventInfo.speakers.length; i < j; i++) {
          eventInfo.speakersHtml += '<h4>' + eventInfo.speakers[i].firstName + ' ' + eventInfo.speakers[i].lastName + '</h4>';
          if (eventInfo.speakers[i].msTeamTitle) {
            eventInfo.speakersHtml += '<h5>' + eventInfo.speakers[i].msTeamTitle + '</h5><p>';
          }
          if (eventInfo.speakers[i].headShot) {
            eventInfo.speakersHtml += '<img class="pull-left speakersImg" height="165" width="165" src="../uploads/' + eventInfo.speakers[i].headShot + '" />';
          }
          if (eventInfo.speakers[i].contactDescription) {
            eventInfo.speakersHtml += eventInfo.speakers[i].contactDescription + '</p>';
          }
          eventInfo.speakersHtml += '<hr class="alt1" />';
        }
        
      }

      //if there are speakers, but no tabs add them as the only tab
      if (eventInfo.tabs.length === 0) {
        eventInfo.eventUltHtml += '<li class="last"><a href="#speakers"><h5>Speakers</h5></a></li></ul>';
        eventInfo.eventDivHtml += '<div id="speakers" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.speakersHtml  + '</div>';
      }
      //if there are event tabs loop over the tabs and create the html for the tabs
      for (let i = 0, j = eventInfo.tabs.length; i < j; i++) {
        //create the first tab with the first and current classes
        if (i === 0) {
          eventInfo.eventUltHtml += '<li class="first current"><a href="#' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '"><h5>' + eventInfo.tabs[i].tabTitle + '</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '" class="tab-content eventTabDiv" style="display:block;">' + eventInfo.tabs[i].tabContent  + '</div>';

        }
        //create the tabs that aren't first or last
        if (i > 0 && i <= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '<li><a href="#' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '"><h5>' + eventInfo.tabs[i].tabTitle + '</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.tabs[i].tabContent  + '</div>';

        }
        //if there are speakers add their html as the last tab
        if (eventInfo.speakers && i >= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '<li class="last"><a href="#speakers"><h5>Speakers</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="speakers" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.speakersHtml  + '</div>';
        }
        //if there are no speakers add the last eventTab as the last tab
        if (!eventInfo.speakers && i >= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '<li class="last"><a href="#' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '"><h5>' + eventInfo.tabs[i].tabTitle + '</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="' + eventInfo.tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '').toLowerCase() + '" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.tabs[i].tabContent  + '</div>';

        }
        //add the closing ul tag
        if (i >= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '</ul>';
        }
      }
      //combint the html for the UL menu and the divs
      eventInfo.htmlContent = eventInfo.eventUltHtml + eventInfo.eventDivHtml;
      //if there is an event header image create the html for the header image
      if (eventInfo.event.eventHeaderImage) {
        eventInfo.headerHtml = '<div class="col_12 internetExplorer event-header center" id="eventHeader"><img src="../uploads/' + eventInfo.event.eventHeaderImage + '" /></div>';
      }
      //read the blank event html file and turn the returned blob into a string, then replace the placeholder html content with the content created by the event
      fs.readFile(path.join(__dirname, '../views/blank-event.html'), function(err, data) {
        let theHtml = data.toString();            
        let fullEventHtml = theHtml.replace('<div class="col_12 internetExplorer event-header center" id="eventHeader"></div>', eventInfo.headerHtml).replace('<section class="col_12 internetExplorer event-tabs" id="eventTabs"></section>', '<section class="col_12 internetExplorer event-tabs" id="eventTabs">' + eventInfo.htmlContent + '</section>');
        res.send(fullEventHtml);
      })
      
    })
  });

  //This route has to be last or it will override the other routes
  /*router.route('/:eventName')
  .get(function (req, res) {
    // var cat = req.params.eventName.toLowerCase().replace(/\s+/g, '');
    var theParam = req.params.eventName.toLowerCase().slice(1);
    sql.sync()
    .then(function () {
      Event.findAll()
      .then(function (data) {
        var testArr = [];
        for (var i = 0; i < data.length; i++) {
          testArr.push(data[i].eventUrl);
        }
        if (testArr.indexOf(req.params.eventName) !== -1) {
          res.sendFile(path.join(__dirname, '../views/blank-event.html'));  
        } 
        if (testArr.indexOf(req.params.eventName) === -1) {
          res.status(404);
          // res.send(path.join(__dirname, '../views/thank-you.html')); //I need to make a 404 page
        }
      });
    });
  });
  */
};