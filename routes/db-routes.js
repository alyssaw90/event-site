'use strict';
/*global interests */
/*global ContactsSuggestedCity */
// require('dotenv').load();
/*let Contact = require('../models/Contact');
let Event = require('../models/Event');
let EventTab = require('../models/EventTab');
let EventImage = require('../models/EventImage');
let User = require('../models/User');*/
const fs = require('fs');
const clc = require('cli-color');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'app/uploads/',
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
const Contact = models.Contact;
const Event = models.Event;
const EventTab = models.EventTab;
const SiteStyle = models.SiteStyle;
const placeholders = require('../models/placeholders');
const dbRelationships = require('../models/relationships');
/*Use the methods below to create the placeholder data. First uncomment the placeholder() and start the server, then comment out the placeholder() and uncomment the dbRelationships() and restart the server. Finally, comment both placeholder() and dbRelationships out and restart the server. At this point, all your placeholder data will be created. Do this only once, if you need to recreate your placeholder data, delete all the tables from the database and repeat these same steps*/
// placeholders();
// dbRelationships();

models.sql.authenticate()
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

  //get Contacts to show on meet the team page
  router.route('/getTeam')
  .get(function(req, res) {
    models.sql.sync()
    .then(function() {
      return Contact.findAll({
        where: {
          showOnMeetTheTeamPage: true
        }
      })
    })
    .then(function(teamMembers) {
      res.json(teamMembers);
    })
  })
  //Get upcoming events for header, carousel, and upcoming events page
  router.route('/futureEventsData')
  .get(function(req, res) {
    let eventDates = 'Coming Soon';
    let eventMonth;
    let city;
    let cityArr;
    models.sql.sync()
    .then(function() {
      return Event.findAll({
        where: {
          eventEndDate: {
              $or: {
                $gte: new Date(),
                $eq: null,
                /* jshint ignore:start */
                $eq: new Date(new Date().getFullYear().toString())
                /* jshint ignore:end */
            }
          }
        }
      })
    })
    .then(function(upcomingEvents) {
      let outputArr = [];
      upcomingEvents.sort(function (a, b) {
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
        
        cityArr = upcomingEvents[i].eventLocation.split('_');
        
        for (let index = 0, j = cityArr.length; index < j; index++) {
          cityArr[index] = cityArr[index].charAt(0).toUpperCase() + cityArr[index].slice(1);
        }

        city = cityArr.join(' ');
        //create dates for future-events page
        if (upcomingEvents[i].eventStartDate !== null && (upcomingEvents[i].eventStartDate.getMonth() !== 0 && upcomingEvents[i].eventStartDate.getDate() !== 1)) {
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

        eventObj.continentColor = continentColors[upcomingEvents[i].eventContinent];
        eventObj.eventDates = eventDates;
        eventObj.headerEventDates = eventMonth ? eventMonth + ', ' + startYear : startYear;
        eventObj.startYear = startYear;
        eventObj.city = city;
        eventObj.colNum = Math.floor(12 / upcomingEvents.length);
        eventObj.eventName = upcomingEvents[i].eventName;
        eventObj.eventUrl = upcomingEvents[i].eventUrl;
        eventObj.eventHighlightColor = upcomingEvents[i].eventHighlightColor;
        eventObj.eventHomepageImage = upcomingEvents[i].eventHomepageImage;

        outputArr.push(eventObj)
      }

      res.json(outputArr);
    })
  })

  //route to send style choices for website
  router.get('/sitestyle', function(req, res) {
    models.sql.sync()
    .then(function() {
      return SiteStyle.findOne({where: {id: 1}});
    })
    .then(function(data) {
      res.json(data);
    });
  });

  //route to send Bing Map API key to front end
  router.route('/bingmapkey')
  .get(function(req, res) {
    res.json(process.env.BING_MAP_API_KEY);
    res.end();
  });


  //get all events for edit events tab
  router.get('/mapevents', function (req, res) {
    models.sql.sync()
      .then(function () {
        return Event.findAll({
          where: {
            eventLocation: {
              $not: null
            }
          }
        });
      })
      .then(function (events) {
        res.json(events);
      });
  });  

  /*/////////////////////////////////////////////////////////////////////////////////////////


               ********The Routes below are for event Creation******


  /////////////////////////////////////////////////////////////////////////////////////////*/

  //create basic event
  // router.post('/createevent', eatAuth, upload.array('images', 2), function (req, res, next) {
  //   models.sql.sync()
  //   .then(function () {
  //     Event.create({
  //       eventName: req.body.newEventName,
  //       eventStartDate: req.body.newEventStartDate,
  //       eventEndDate: req.body.newEventEndDate,
  //       eventLocation: req.body.newEventLocation,
  //       eventHeaderImage: req.files[0].filename,
  //       eventHomepageImage: req.files[1].filename,
  //       eventContinent: req.body.newEventContinent,
  //       eventHighlightColor: req.body.newEventColor
  //     })
  //     .then(function(newEvent) {
  //       res.json(newEvent.id);
  //     });
  //   });
  // });

  // //Find an event with the id from req.body.eventId and add the string of speakers then save
  // router.post('/addeventspeakers', eatAuth, function(req, res, next) {
  //   models.sql.sync()
  //   .then(function() {
  //     return Event.findOne({where: {id: req.body.eventId}});
  //   })
  //   .then(function(thisEvent) {
  //     thisEvent.eventSpeakers = req.body.speakers;
  //     thisEvent.save().then(function() {});
  //   });
  // });

  // //create a tab with data from req.body
  // router.post('/addtabs', eatAuth, function(req, res, next) {
  //   models.sql.sync()
  //   .then(function() {
  //     EventTab.create({
  //       eventId: req.body.eventId,
  //       tabNumber: req.body.tabNumber,
  //       tabTitle: req.body.tabTitle,
  //       tabContent: req.body.tabContent
  //     });
  //     res.end();
  //   });
  // });

  // //show all images
  // router.get('/showimages', eatAuth, function(req, res) {
  //   fs.readdir(path.join(__dirname, 'app/uploads'), function(err, files) {
  //     let outputHtml = '';
  //     if (err) {
  //       console.log(err);
  //       res.status(500).json({msg: 'internal server error'});
  //     }

  //     for (let i = 0, j = files.length; i < j; i ++) {
  //       if (files[i] !== '.gitignore') {
  //         outputHtml += '<img class="imageToInsert" style="height: 50px; margin: 10px 10px 10px 10px" data-clipboard-text="app/uploads/' + files[i] + '" src="app/uploads/' + files[i] + '" />';
  //       }
  //     }
  //     outputHtml += '<script type="text/javascript">$(".imageToInsert").click(function() {$(this).toggleClass("animated shake");})';
  //     res.send(outputHtml);
  //   });
  // });
  
  // //add an image from req.body
  // router.post('/addimage', eatAuth, upload.single('images'), function (req, res, next) {
  //   if (req.body.eventId) {
  //     models.sql.sync()
  //     .then(function() {
  //       return Event.findOne({where: {id: req.body.eventId}});
  //     })
  //     .then(function(data) {
  //       let imageName;
  //       if (req.file) {
  //         imageName = req.file.filename;
  //       } else {
  //         imageName = req.body.editHeaderWithExistingImage;
  //       }
  //       if (imageName.substr(0, 9) === 'app/uploads/') {
  //         imageName = imageName.slice(9);
  //       }
  //       var key = req.body.whatToChange;
  //       data[key] = imageName;
  //       data.save();
  //       res.end();
  //     });
      
  //   }
  // });
  // //get all events for edit events tab
  // router.get('/allevents', function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return Event.findAll();
  //   })
  //   .then(function(events) {
  //     res.json(events);
  //   });
  // });

  // router.get('/alltabs', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return EventTab.findAll();
  //   })
  //   .then(function(tabs) {
  //     res.json(tabs);
  //   });
  // });

  // //route to return event tab being searched
  // router.post('/eventTabs', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     EventTab.findOne({where: {id: req.body.tabId}})
  //     .then(function(data) {
  //       let tabObj = {
  //         tabContent: data.tabContent,
  //         tabNumber: data.tabNumber,
  //         tabTitle: data.tabTitle,
  //         tabId: data.id,
  //         eventId: data.eventId
  //       };
  //       res.json(tabObj);
  //     });
  //   });
  // });

  // //search for a tab with the id from req.body.tabId and replace the data with the submitted data
  // router.post('/edittab', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return EventTab.findOne({where: {id: req.body.tabId}});
  //   })
  //   .then(function(tab) {
  //     if (req.body.tabNumber) {
  //       tab.tabNumber = req.body.tabNumber;
  //     }
  //     if (req.body.tabTitle) {
  //       tab.tabTitle = req.body.tabTitle;
  //     }
  //     if (req.body.tabContent) {
  //       tab.tabContent = req.body.tabContent;
  //     }
  //     tab.save();
  //     res.end();
  //   });
  // });

  // //find the searched for event and return the html form to edit it
  // router.post('/findeventtoedit', eatAuth, function(req, res) {
  //   //declare variable to save the eventId for later searches
  //   let thisEventId;
  //   //create object to hold html to be sent to the DOM
  //   let editEventHtml = {};
  //   //create an eventInfo object to hold the values for the event to be rendered
  //   let eventInfo = {};
  //   eventInfo.eventUrl = req.body.eventUrl;
  //   //sync with the database
  //   models.sql.sync()
  //   .then(function() {
  //     //trim the params to get the city and the year of the event
  //     let eventSearchCity = req.body.eventUrl.slice(0, -4);
  //     let eventYear = req.body.eventUrl.slice(-4);
  //     let testDate = new Date(eventYear - 1, 11, 31, 11, 59, 59);
  //     // search the database for event that matches the city and occurs on or after the year from the params and return the event found
  //     return Event.findOne({
  //       where: {
  //         eventLocation: eventSearchCity,
  //         eventStartDate: {
  //           $or: {
  //             $gte: testDate,
  //             $eq: null
  //           }
  //         }
  //       }
  //     });
  //   })
  //   .then(function(theEvent) {
  //     thisEventId = theEvent.id;
  //     eventInfo.theEvent = theEvent;
  //     return EventTab.findAll({
  //       where: {
  //         eventId: theEvent.id
  //       }
  //     });
  //   })
  //   .then(function(tabs) {
  //     let speakersArr;
  //     eventInfo.tabs = tabs;
  //     //split the speaker IDs into an array then search for all Contacts that haver an ID that appears in the array and return the result
  //     if (eventInfo.theEvent.eventSpeakers) {
  //       speakersArr = eventInfo.theEvent.eventSpeakers.split(',');
  //     } else {
  //       speakersArr = [];
  //     }
        
  //     return Contact.findAll({
  //       where: {
  //         id: {$in: speakersArr}
  //       }
  //     });
  //   })
  //   .then(function(speakers) {
  //     let tabForm = `<form id="editEventTabs">`;
  //     let deleteTabForm;
  //     //create an array and push each speaker object into it with the needed values and add the array to the eventInfo object
  //     let speakersArr =  [];
  //     let i = 0;
  //     //loop over speakers to create object with all speakers
  //     for (let key in speakers) {
  //       speakersArr[i] = {};
  //       speakersArr[i].firstName = speakers[key].firstName;
  //       speakersArr[i].lastName = speakers[key].lastName;
  //       speakersArr[i].msTeamTitle = speakers[key].msTeamTitle;
  //       speakersArr[i].headShot = speakers[key].headShot;
  //       speakersArr[i].contactDescription = speakers[key].contactDescription;
  //       i++;
  //     }
  //     //create a form input with the tabs for each event
  //     for (let i = 0, j = eventInfo.tabs.length; i < j; i++) {
  //       tabForm += `<label for="chooseEventToEdit">${eventInfo.tabs[i].tabTitle}</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="chooseEventToEdit${i}" name="chooseEventToEdit" type="radio" value="${eventInfo.tabs[i].id}" data-tabName="${eventInfo.tabs[i].tabTitle}" data-eventName="${eventInfo.theEvent.eventName}"></input></input>`;
  //     }
  //     //add the button to the end of the tab form
  //     tabForm += `<button class="medium" id="chooseTabToEditButton">Choose tab</button></form>`;
  //     //replace edit with deletes to create delete tab form
  //     deleteTabForm = tabForm.replace('chooseEventToEdit', 'chooseEventToDelete').replace('chooseTabToEditButton', 'chooseTabToDeleteButton').replace('editEventTabs', 'deleteEventTabs');
  //     //declare keys and values to send as response
  //     eventInfo.speakers = speakersArr;
  //     editEventHtml.eventToEditId = thisEventId;
  //     editEventHtml.eventTabs = tabForm;
  //     editEventHtml.deleteEventTabs = deleteTabForm;
  //     editEventHtml.eventName = `<form action="edittheevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a name</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="text" value="${eventInfo.theEvent.eventName}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" id="whatToChange" name="whatToChange" value="eventName"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventRegistrationLink = `<form action="edittheevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a registraion link</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="text submit" value="${eventInfo.theEvent.eventRegistrationLink}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventRegistrationLink"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventLocation = `<form action="edittheevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a new city</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="text submit" value="${eventInfo.theEvent.eventLocation}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventLocation"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventContinent = `<form action="edittheevent" id="editEventForm" method="POST"><label class="col_4" for="editEventInput">The current continent is ${eventInfo.theEvent.eventContinent}</label><input type="radio" id="editEventInput" name="editEventInput" value="North America">North America</input><input type="radio" id="editEventInput" name="editEventInput" value="South America">South America</input><input type="radio" id="editEventInput" name="editEventInput" value="Africa">Africa</input><input type="radio" id="editEventInput" name="editEventInput" value="Asia">Asia</input><input type="radio" id="editEventInput" name="editEventInput" value="Europe">Europe</input><input type="radio" id="editEventInput" name="editEventInput" value="Oceania">Australia</input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventContinent"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventStartDate = `<form action="edittheevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a new start date</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="date" value="${eventInfo.theEvent.eventStartDate}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventStartDate"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventEndDate = `<form action="edittheevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a new end date</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="date" value="${eventInfo.theEvent.eventEndDate}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventEndDate"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventHeaderImage = `<form action="savenewimage" id="editEventForm" method="POST" enctype="multipart/form-data"><label for="editEventInput">Choose a new event header image</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="images" type="file" value="${eventInfo.theEvent.eventHeaderImage}"></input><label for="editHeaderWithExistingImage">Enter copied image URL here</label><input type="text" name="editHeaderWithExistingImage" id="editHeaderWithExistingImage">Enter copied URL here</input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventHeaderImage"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventHomepageImage = `<form action="savenewimage" id="editEventForm" method="POST" enctype="multipart/form-data"><label for="editEventInput">Choose a new event header image</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="images" type="file" value="${eventInfo.theEvent.eventHomepageImage}"></input><label for="editHeaderWithExistingImage">Enter copied image URL here</label><input type="text" name="editHeaderWithExistingImage" id="editHeaderWithExistingImage">Enter copied URL here</input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" name="whatToChange" value="eventHomepageImage"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventHighlightColor = `<form action="edittheevent" id="editEventForm" method="POST"><label for="editEventInput">Choose a color</label><input class="col_8" style="margin-left:10px; margin-right:10px;" id="editEventInput" name="editEventInput" type="color" value="${eventInfo.theEvent.eventHighlightColor}"></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><input type="hidden" id="whatToChange" id="whatToChange" name="whatToChange" value="eventHighlightColor"></input><button class="medium" id="editEventNameButton">Save</button></form>`;
  //     editEventHtml.eventSpeakers = `<form id="editSpeakerCount"><label for="newSpeakerCount">How many speakers will the event have?</label><input type="number" id="newSpeakerCount" name="newSpeakerCount"></input></input><input type="hidden" id="eventId" name="eventId" value="${eventInfo.theEvent.id}"></input><button class="medium" id="newSpeakerCountButton" type="submit">Choose Speakers</button></form><form action="/editevent" id="newAddSpeakersForm" method="post" enctype="multipart/form-data"><input type="hidden" id="whatToChange" id="whatToChange" name="whatToChange" value="eventSpeakers"></input></form>`;
  //     res.json(editEventHtml);
  //   });

  // });

  // //find event and change the value that is sent in req.body.whatToChange
  // router.post('/editevent', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return Event.findOne({where:{id: req.body.eventId}});
  //   })
  //   .then(function(eventToEdit) {
  //     let key = req.body.whatToChange;
  //     eventToEdit[key] = req.body.editEventInput;
  //     eventToEdit.save();
  //     res.end();
  //   });
  // });

  // //delete event route
  // router.post('/deleteevent', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return Event.findOne({
  //       where: {
  //         id: req.body.eventToBeDeletedId
  //       }
  //     });
  //   })
  //   .then(function(theEvent) {
  //     theEvent.destroy();
  //     res.end();
  //   });
  // });

  // //delete tab route
  // router.post('/deletetab', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return EventTab.findOne({
  //       where: {
  //         id: req.body.tabToDeleteId
  //       }
  //     });
  //   })
  //   .then(function(tabToDelete) {
  //     tabToDelete.destroy();
  //     res.end();
  //   });
  // });

  // //get all contacts for editing
  // router.get('/contacts'/*, eatAuth*/, function (req, res) {
  //   models.sql.sync()
  //   .then(function () {
  //     Contact.findAll()
  //     .then(function (data) {
  //       res.json(data);
  //     });
  //   });
  // });

  // //route to create speakers
  // router.post('/addspeakers', eatAuth, upload.single('headshot'), function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     let speakerEmail = req.body.newSpeakerEmail ? req.body.newSpeakerEmail : 'plugfests@microsoft.com';
  //     let speakerHeadshot = req.file ? req.file.filename : 'placeholder-headshot.jpg';
  //     Contact.create({
  //       firstName: req.body.newSpeakerFirstName,
  //       lastName: req.body.newSpeakerLastName,
  //       email: speakerEmail,
  //       contactDescription: req.body.contactDescription,
  //       showOnMeetTheTeamPage: req.body.showOnMeetTheTeamPage,
  //       meetTheTeamPageOrder: req.body.meetTheTeamPageOrder,
  //       msTeamTitle: req.body.msTeamTitle,
  //       headShot: speakerHeadshot,
  //       company: req.body.company,
  //       address: req.body.address,
  //       country: req.body.country,
  //     });
  //     res.end();
  //   });
  // });

  // //route to add speakers to edit speakers form
  // router.get('/getspeakers', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return Contact.findAll();
  //   })
  //   .then(function(speakers) {
  //     let returnObj = {
  //       editSpeakers: [],
  //       deleteSpeakers: []
  //     };
  //     for (var i = 0, len = speakers.length; i < len; i++) {
  //       let tmpEditHtml = `<div class="col_12"><img style="height: 165px;" src="app/uploads/${speakers[i].headShot}"/><h4>${speakers[i].fullName}</h4><button class="editSpeakersButton" data-speakerId="${speakers[i].id}">Edit ${speakers[i].fullName}</button></div>`;
  //       let tmpDeleteHtml = `<div class="col_12"><img style="height: 165px;" src="app/uploads/${speakers[i].headShot}"/><h4>${speakers[i].fullName}</h4><button class="deleteSpeakersButton" data-speakerId="${speakers[i].id}" data-speakerName="${speakers[i].fullName}">Delete ${speakers[i].fullName}</button></div>`;
  //       returnObj.editSpeakers.push(tmpEditHtml);
  //       returnObj.deleteSpeakers.push(tmpDeleteHtml);
  //     }
  //     res.send(returnObj);
  //   });
  // });

  // router.post('/showspeakertoedit', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return Contact.findOne({
  //       where: {
  //         id: {
  //           $eq: req.body.speakerId
  //         }
  //       }
  //     })
  //   })
  //   .then(function(data) {
  //     let speakerToEditHtml = `<h2>Edit Speaker</h2>
  //         <form id="editSpeakerForm" method="POST" enctype="multipart/form-data" class="col_12">
  //           <input type="hidden" name="editSpeakerId" id="editSpeakerId" value="${data.id}" />
  //           <label class="col_4" for="editSpeakerFirstName">Speaker's First Name</label>
  //           <input class="col_8" id="editSpeakerFirstName" name="editSpeakerFirstName" type="text" placeholder="${data.firstName}" />
  //           <label class="col_4" for="editSpeakerLastName">Speaker's Last Name</label>
  //           <input class="col_8" id="editSpeakerLastName" name="editSpeakerLastName" type="text" placeholder="${data.lastName}" />
  //           <label class="col_4" for="editSpeakerEmail">Speaker's Email</label>
  //           <input class="col_8" id="editSpeakerEmail" name="editSpeakerEmail" type="email" placeholder="${data.email}" />
  //           <label class="col_12" for="editShowOnMeetTheTeamPage">Should this speaker appear on the meet the team page?</label>
  //           <label class="col_4" for="editShowOnMeetTheTeamPage">Yes, place this speaker on the meet the team page</label>
  //           <input class="col_4" type="radio" name="editShowOnMeetTheTeamPage" id="editShowOnMeetTheTeamPage1" value="true">
  //           <br />
  //           <label class="col_4" for="editShowOnMeetTheTeamPage">No, do not place this speaker on the meet the team page</label>
  //           <input class="col_4" type="radio" name="editShowOnMeetTheTeamPage" id="editShowOnMeetTheTeamPage2" value="false">
  //           <label class="col_12" for="editMeetTheTeamPageOrder">What position should this speaker appear on the meet the team page? (if they appear on the meet the team page)</label>
  //           <input class="col_8" type="number" name="editMeetTheTeamPageOrder" id="editMeetTheTeamPageOrder">
  //           <label class="col_4" for="editCompany">What company is this speaker with?</label>
  //           <input class="col_8" type="text" name="editCompany" id="editCompany" placeholder="${data.company}">
  //           <label class="col_4" for="editmsTeamTitle">What is this speaker's title?</label>
  //           <input class="col_8" type="text" name="editmsTeamTitle" id="editmsTeamTitle" placeholder="${data.msTeamTitle}">
  //           <label class="col_4" for="editAddress">Address</label>
  //           <input class="col_8" type="text" name="editAddress" id="editAddress" placeholder="${data.address}">
  //           <label class="col_4" for="editCountry">Country</label>
  //           <input class="col_8" type="text" name="editCountry" id="editCountry" placeholder="${data.country}">
  //           <label class="col_4" for="editHeadshot">Head Shot</label>
  //           <input class="col_8" type="file" name="editHeadshot" id="editHeadshot">
  //           <label class="col_12" for="editContactDescription">Speaker Description</label>
  //           <textarea class="col_8" spellcheck="true" rows="20" name="editContactDescription" id="editContactDescription" placeholder="${data.contactDescription}"></textarea>
  //           <br>
  //           <br>
  //         </form>
  //         <script type="text/javascript">$('#editSpeakerForm').validate();</script>
  //         <button id="editSingleSpeakerButton" data-speakerId="${data.id}">Submit</button>`;
  //     res.send(speakerToEditHtml);
  //   });
  // });

  // router.post('/editspeaker', eatAuth, upload.single('editHeadshot'), function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return Contact.findOne({
  //       where: {
  //         id: req.body.editSpeakerId
  //       }
  //     });
  //   })
  //   .then(function(speaker) {
  //     speaker.firstName = req.body.editSpeakerFirstName ? req.body.editSpeakerFirstName : speaker.firstName;
  //     speaker.lastName = req.body.editSpeakerLastName ? req.body.editSpeakerLastName : speaker.lastName;
  //     speaker.email = req.body.editSpeakerEmail ? req.body.editSpeakerEmail : speaker.email;
  //     speaker.contactDescription = req.body.editContactDescription ? req.body.editContactDescription : speaker.contactDescription;
  //     speaker.showOnMeetTheTeamPage = req.body.editShowOnMeetTheTeamPage ? req.body.editShowOnMeetTheTeamPage : speaker.showOnMeetTheTeamPage;
  //     speaker.meetTheTeamPageOrder = req.body.editMeetTheTeamPageOrder ? req.body.editMeetTheTeamPageOrder : speaker.meetTheTeamPageOrder;
  //     speaker.msTeamTitle = req.body.editmsTeamTitle ? req.body.editmsTeamTitle : speaker.msTeamTitle;
  //     speaker.headShot = req.file ? req.file.filename : speaker.headShot;
  //     speaker.company = req.body.editCompany ? req.body.editCompany : speaker.company;
  //     speaker.address = req.body.editAddress ? req.body.editAddress : speaker.address;
  //     speaker.country = req.body.editCountry ? req.body.editCountry : speaker.country;
  //     speaker.save();
  //     res.end();
  //   });
  // });

  // router.delete('/deletespeaker', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return Contact.findOne({
  //       where: {
  //         id: req.body.speakerId
  //       }
  //     });
  //   })
  //   .then(function(theSpeaker) {
  //     theSpeaker.destroy();
  //     res.end();
  //   });
  // });
  
  // router.post('/editslidersettings', eatAuth, function(req, res) {
  //   models.sql.sync()
  //   .then(function() {
  //     return SiteStyle.findOne();
  //   })
  //   .then(function(sliderSettings) {
  //     sliderSettings.showSlider = req.body.showSlider ? req.body.showSlider : sliderSettings.showSlider;
  //     sliderSettings.showPastEventsBanner = req.body.showBannersFromPastEvents ? req.body.showBannersFromPastEvents : sliderSettings.showPastEventsBanner;
  //     sliderSettings.hideEventBanners = req.body.showFutureEventBanners ? req.body.showFutureEventBanners : sliderSettings.hideEventBanners;
  //     sliderSettings.save();
  //     res.end();
  //   })
  // })



  /*///////////////////////////////////////////////////////////////////////



  This route creates the html for the event pages. This route MUST be last



  ///////////////////////////////////////////////////////////////////////*/
  router.route('/api/:eventUrl')
  .get(function(req, res) {
    //check if last 4 digits of url slug (req.params.eventUrl) are a number and end the response  if they're not numbers i.e. not a year and end the response if they're not
    if (!/^\d+$/.test(req.params.eventUrl.slice(-4))) {
      return res.end();
    }
    //create an eventInfo object to hold the values for the event to be rendered
    let eventInfo = {};
    eventInfo.eventUrl = req.params.eventUrl;
    eventInfo.htmlContent = '';
    eventInfo.eventUltHtml = '<ul class="tabs left" id="eventTabLinks">';
    eventInfo.eventDivHtml = '';
    eventInfo.speakersHtml =  '';
    eventInfo.headerHtml = '';
    //sync with the database
    models.sql.sync()
    .then(function() {
      //trim the params to get the city and the year of the event
      let eventSearchCity = req.params.eventUrl.slice(0, -4);
      let eventYear = req.params.eventUrl.slice(-4);
      let testDate = new Date(eventYear - 1, 11, 31, 11, 59, 59) == 'Invalid Date' ? 'not a date' : new Date(eventYear - 1, 11, 31, 11, 59, 59);
      if (testDate === 'not a date') {
        return res.status(404).redirect('/404');
      }
      // search the database for event that matches the city and occurs on or after the year from the params and return the event found
      return Event.findOne({
        where: {
          eventLocation: eventSearchCity,
          eventStartDate: {
            $or: {
              $gte: testDate,
              $eq: null
            }
          }
        }
      });
    })
    .then(function(theEvent) {
      //assign the event returned from the search to the event key of the eventInfo object
      eventInfo.event = theEvent;
    })
    .then(function() {
      // search for all the tabs that are associated with the current event
      if (eventInfo.event.id) {
        return EventTab.findAll({
          where: {
            eventId: eventInfo.event.id
          }
        });
      } else {
        res.end();
      }
    })
    .then(function(theTabs) {
      theTabs.sort(function(a, b) {
        a = a.tabNumber;
        b = b.tabNumber;
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
      //assign the returned event tabs to the tabs key of the eventInfo object
      eventInfo.tabs = theTabs;
    })
    .then(function() {
      let speakersArr;
      //split the speaker IDs into an array then search for all Contacts that haver an ID that appears in the array and return the result
      if (eventInfo.event.eventSpeakers !== null) {
        speakersArr = eventInfo.event.eventSpeakers.split(',');
      } else {
        speakersArr = [];
      }
      return Contact.findAll({
        where: {
          id: {$in: speakersArr}
        }
      });
    })
    .then(function(theSpeakers) {
      //create an array and push each speaker object into it with the needed values and add the array to the eventInfo object
      let speakersArr =  [];
      let i = 0;
      for (let key in theSpeakers) {
        speakersArr[i] = {};
        speakersArr[i].firstName = theSpeakers[key].firstName;
        speakersArr[i].lastName = theSpeakers[key].lastName;
        speakersArr[i].fullName = theSpeakers[key].fullName;
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
            eventInfo.speakersHtml += `<img class="pull-left speakersImg" height="165" width="165" alt="image of ${speakersArr[i].fullName}" src="app/uploads/${eventInfo.speakers[i].headShot}" />`;
          }
          if (eventInfo.speakers[i].contactDescription) {
            eventInfo.speakersHtml += eventInfo.speakers[i].contactDescription + '</p>';
          }
          eventInfo.speakersHtml += '<hr class="alt1" />';
        }
        
      }

      //if there are speakers, but no tabs add them as the only tab
      if (eventInfo.tabs.length === 0 && eventInfo.speakers.length > 0) {
        eventInfo.eventUltHtml += '<li class="last"><a href="#speakers"><h5>Speakers</h5></a></li></ul>';
        eventInfo.eventDivHtml += `<div id="speakers" class="tab-content eventTabDiv" style="display:none;">${eventInfo.speakersHtml}</div>`;
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
        if (eventInfo.speakers.length > 0 && i >= eventInfo.tabs.length - 1) {
          eventInfo.eventUltHtml += '<li class="last"><a href="#speakers"><h5>Speakers</h5></a></li>';
          eventInfo.eventDivHtml += '<div id="speakers" class="tab-content eventTabDiv" style="display:none;">' + eventInfo.speakersHtml  + '</div>';
        }
        //if there are no speakers and there is more than one tab add the last eventTab as the last tab
        if (eventInfo.speakers.length <= 0 && i > eventInfo.tabs.length - 1 && eventInfo.tabs.length > 1) {
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
        eventInfo.headerHtml = '<div class="col_12 internetExplorer event-header center" id="eventHeader" role="complementary"><img alt="event banner image" src="app/uploads/' + eventInfo.event.eventHeaderImage + '" /></div>';
      }
      let theEventHtml = eventInfo.headerHtml + '<section class="col_12 internetExplorer event-tabs" id="eventTabs">' + eventInfo.htmlContent + '</section>';
      
      res.json(theEventHtml);
      //read the blank event html file and turn the returned blob into a string, then replace the placeholder html content with the content created by the event
      /*fs.readFile(path.join(__dirname, '../app/blank-event.html'), function(err, data) {
        let theHtml = data.toString();            
        let fullEventHtml = theHtml.replace('<div class="col_12 internetExplorer event-header center" id="eventHeader"></div>', eventInfo.headerHtml).replace('<section class="col_12 internetExplorer event-tabs" id="eventTabs"></section>', '<section class="col_12 internetExplorer event-tabs" id="eventTabs">' + eventInfo.htmlContent + '</section>').replace(`<title></title>`, `<title>${eventInfo.event.eventName}</title>`);
        res.send(fullEventHtml);
      });*/
      
    });
  });

  /*Send index.html for all routes that aren't used for data*/
  router.route('/*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, '../app/index.html'));
  });

};