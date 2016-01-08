'use strict';

require('dotenv').load();
var Contact = require('../models/Contact');
var NewsletterSignup = require('../models/NewsletterSignup');
var SuggestedCity = require('../models/SuggestedCity');
var Interest = require('../models/Interest');
var Event = require('../models/Event');
var EventSchedule = require('../models/EventSchedule');
var EventAttendee = require('../models/EventAttendee');
var SurveyQuestion = require('../models/SurveyQuestion');
var SurveyAnswer = require('../models/SurveyAnswer');
// var User = require('../models/User');
var EventImage = require('../models/EventImage');
var aboutUs = require('../views/about')();
var fs = require('fs');
var clc = require('cli-color');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage });
var bodyparser = require('body-parser');
var path = require('path');
var Sql = require('sequelize');
/*var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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

sql.authenticate()
  .then(function (err) {
    if (err) {
      console.log(clc.xterm(202)('Unable to connect to the database: '), err);
    } else {
      console.log(clc.xterm(202)('Connection has been established successfully.'));
    }
  });

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var randomTabImages = ['alt-slide-1.jpg', 'alt-slide-2.jpg', 'alt-slide-3.jpg', 'alt-slide-4.jpg', 'alt-slide-5.jpg', 'alt-slide-6.jpg'];
var msColors = ['ffb900', 'd83b01', 'e81123', 'b4009e', '5c2d91', '0078d7', '008272', '107c10'];
var continentColors = {'North America': 'ffb900', 'South America': '107c10', 'Africa': 'e81123', 'Asia': '0078d7', 'Europe': '5c2d91', 'Oceania': 'b4009e'};

function shuffle (arr) {
  var currentIndex = arr.length, tempVal, randomIndex ;

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

  router.route('/')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/test.html'));
  });

  router.route('/test')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/test.html'));
  });

  router.route('/test2')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/test2.html'));
  });

  router.route('/test3')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/test3.html'));
  });

  router.route('/about')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/about.html'));
  });

  router.route('/past-events')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/past-events.html'));
  });

  router.route('/meet-the-team')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/meet-the-team.html'));
  });

  router.route('/contactus')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
  });

  router.route('/faq')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/faq.html'));
  });

  router.route('/santa-clara-2015')
  .get(function (req, res) {
   res.sendFile(path.join(__dirname, '../views/events/santa-clara-2015.html'));
  }); 

  router.route('/latest-news')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/latest-news.html'));
  });

  router.route('/map')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/world-map.html'));
  });

  router.route('/survey/:eventId')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/survey.html'));
  });

  router.route('/media')
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '../views/media.html'));
  });

  router.route('/showfullteam')
  .get(function (req, res) {
    var start = new Date().getTime();
    console.log('start time : ', start);
    sql.sync()
    .then(function () {
      Contact.findAll({where: {msTeamMember: true}})
      .then(function (data) {
        res.json(data);
      })
      .error(function (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      });
    });
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
          data.contactId = data2.id;
          data.save().then(function() {
            ContactsSuggestedCity.create({suggestedCity: req.body.city, contactId: data2.id});            
          })
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

router.route('/findsurvey')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      SurveyQuestion.findAll()
      .then(function (data) {
        res.json(data);
      })
    })
  })

router.route('/answersurvey')
.post(function (req, res) {
  sql.sync()
  .then(function () {
    for (var i = 0, j = req.body.surveyQuestionId.length; i < j; i++) {
      SurveyAnswer.create({answer: req.body.answer[i], surveyQuestionId: req.body.surveyQuestionId[i], question: req.body.question[i]});
    }
    res.sendFile(path.join(__dirname, '../views/thank-you.html'));
  })
})

  router.route('/addschedule') 
  .post(function (req, res) {
    sql.sync()
    .then(function () {
      EventSchedule.create(req.body)
      res.end();
    })
  })

  router.route('/deleteschedule')
  .post(function (req, res) {
    sql.sync()
    .then(function () {
      EventSchedule.destroy({where: {id: req.body.scheduleId}});
      res.end();
    })
  })

  
  router.route('/createevent')
  .post(upload.array('images', 4), function (req, res, next) {
    sql.sync()
    .then(function () {
      // Event.create(req.body)
      Event.create({
        eventName: req.body.eventName,
        eventRegistrationLink: req.body.eventRegistrationLink, //link to registrationfor event
        eventLocation: req.body.eventLocation,
        eventStartDate: req.body.eventStartDate, //the start date...
        eventEndDate: req.body.eventEndDate, // the end date...
        eventHeaderImage: req.files[0].filename, //link to header image
        eventFuturePageImage: req.files[1].filename, //image to appear on event slide on homepage
        eventFuturePageText: req.body.eventFuturePageText, //slide up text for future events page
        eventSlideshowImage: req.files[2].filename, //image for front page slider
        homepageBulletOne: req.body.homepageBulletOne,
        homepageBulletTwo: req.body.homepageBulletTwo,
        homepageBulletThree: req.body.homepageBulletThree,
        eventSponsorsTab: req.body.eventSponsorsTab, //copy for Sponsors Tab
        eventOverviewTab: req.body.eventOverviewTab, //copy for Overview Tab
        travelTabHeaderImage: req.files[3].filename, //image to appear above travel tabs
        travelVenueTab: req.body.travelVenueTab, //copy for travel venue sub tab
        travelTravelTab: req.body.travelTravelTab, //copy for trave travel sub tab
        travelAccomodationsTab: req.body.travelAccomodationsTab, //copy for travel accommodations sub tab
        travelTipsTab: req.body.travelTipsTab, //copy for travel Tips and Tricks sub tab
        travelEatDrinkTab: req.body.travelEatDrinkTab, //copy for travel eat and drink sub tab
        eventMediaTab: req.body.eventMediaTab //copy for media tab
      })
      res.end()
    })
  })

router.route('/showimages')
.get(function (req, res) {
  EventImage.findAll()
  .then(function (data) {
    res.json(data);
  })
})

  router.route('/addimage')
  .post(upload.single('images'), function (req, res, next) {
    // console.log(clc.yellow('FFFFFFFFFFFFFFFFF ::::::::   '), req.files)
    res.json(req.files);
  })

/*  router.route('/addoverview')
  .post(function (req, res) {
    console.log(clc.magenta( '::::::::::::::::::::::::::'  ), req.body)
    sql.sync()
    .then(function () {
      EventOverview.create(req.body)
      res.end();
    })
  })*/

/*  router.route('/deleteoverview')
  .post(function (req, res) {
    sql.sync()
    .then(function () {
      console.log(clc.magenta('LLLLLLLLLLLLLLL :::::::::::   '), req.body);
      EventOverview.destroy({where: {id: req.body.overviewId}});
      res.end();
    })
  })*/

  router.route('/oldhome')
  .get(function (req, res) {
    var slides = '<ul class="slideshow">';
    var newHtml = '';
    fs.readFile(path.join(__dirname, '../views/index.html'), function (err, html) {
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      }
      sql.sync()
      .then(function () {
        Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
        .then(function (frontPageEvents) {
          for (var i = 0, j = frontPageEvents.length; i < j; i++) {
           /* if (!frontPageEvents[i].eventSlideshowImage) {
              frontPageEvents[i].eventSlideshowImage = randomTabImages[Math.floor(Math.random() * 4)];
            }*/
          
            slides += '<li><span class="slideshowWrapper"><a href="/event/' + frontPageEvents[i].eventUrl + '"><h2 class="desc"><span class="slide-title">' + frontPageEvents[i].eventName + '</span><br /><br /><br /><span class="sub-title slideshow-date">' + months[frontPageEvents[i].eventStartDate.getMonth()] + ' ' + frontPageEvents[i].eventStartDate.getDate() + ' - ' + frontPageEvents[i].eventEndDate.getDate() + ', ' + frontPageEvents[i].eventEndDate.getFullYear() + '</span>';
            if (frontPageEvents[i].eventRegistrationLink) {
              slides += '<div class="sliderRegisterButton clearfix"><a href="' + frontPageEvents[i].eventRegistrationLink + '">Register Now!</a></div>';
            } else if (!frontPageEvents[i].eventRegistrationLink) {
              slides += '<div class="sliderRegisterButton clearfix" style="visibility: hidden;"><a href="' + frontPageEvents[i].eventRegistrationLink + '">Register Now!</a></div>';
            }
            /*if (frontPageEvents[i].homepageBulletOne) {
              slides += '<br /><br /><span class="sub-title"><i class="fa fa-code"></i> ' + frontPageEvents[i].homepageBulletOne + '</span>';
            } else if (!frontPageEvents[i].homepageBulletOne) {
              slides += '<br /><span class="sub-title"></span>';
            }
            if (frontPageEvents[i].homepageBulletTwo) {
              slides += '<br /><span class="sub-title"><i class="fa fa-code"></i> ' + frontPageEvents[i].homepageBulletTwo + '</span>';
            } else if (!frontPageEvents[i].homepageBulletTwo) {
              slides += '<br /><span class="sub-title"></span>';
            }
            if (frontPageEvents[i].homepageBulletThree) {
              slides += '<br /><span class="sub-title"><i class="fa fa-code"></i> ' + frontPageEvents[i].homepageBulletThree + '</span>';
            } else if (!frontPageEvents[i].homepageBulletThree) {
              slides += '<br /><br /><span class="sub-title"></span>';
            }*/
            slides += '</h2></a></span><img src="./uploads/' + frontPageEvents[i].eventSlideshowImage + '" /></li>';
          }
          newHtml = html.toString().replace('<ul class="slideshow">', slides);
          res.send(newHtml);
        });
      });
    });
  });

router.route('/test2')
  .get(function (req, res) {
    var slides = '<ul class="slideshow">';
    var newHtml = '';
    fs.readFile(path.join(__dirname, '../views/test2.html'), function (err, html) {
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      }
      sql.sync()
      .then(function () {
        Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
        .then(function (frontPageEvents) {
          for (var i = 0, j = frontPageEvents.length; i < j; i++) {
           /* if (!frontPageEvents[i].eventSlideshowImage) {
              frontPageEvents[i].eventSlideshowImage = randomTabImages[Math.floor(Math.random() * 4)];
            }*/
          
            slides += '<li><span class="slideshowWrapper"><a href="/event/' + frontPageEvents[i].eventUrl + '"><h2 class="desc"><span class="slide-title">' + frontPageEvents[i].eventName + '</span><br /><br /><br /><span class="sub-title slideshow-date">' + months[frontPageEvents[i].eventStartDate.getMonth()] + ' ' + frontPageEvents[i].eventStartDate.getDate() + ' - ' + frontPageEvents[i].eventEndDate.getDate() + ', ' + frontPageEvents[i].eventEndDate.getFullYear() + '</span>';
            if (frontPageEvents[i].eventRegistrationLink) {
              slides += '<div class="sliderRegisterButton clearfix"><a href="' + frontPageEvents[i].eventRegistrationLink + '">Register Now!</a></div>';
            } else if (!frontPageEvents[i].eventRegistrationLink) {
              slides += '<div class="sliderRegisterButton clearfix" style="visibility: hidden;"><a href="' + frontPageEvents[i].eventRegistrationLink + '">Register Now!</a></div>';
            }
            /*if (frontPageEvents[i].homepageBulletOne) {
              slides += '<br /><br /><span class="sub-title"><i class="fa fa-code"></i> ' + frontPageEvents[i].homepageBulletOne + '</span>';
            } else if (!frontPageEvents[i].homepageBulletOne) {
              slides += '<br /><span class="sub-title"></span>';
            }
            if (frontPageEvents[i].homepageBulletTwo) {
              slides += '<br /><span class="sub-title"><i class="fa fa-code"></i> ' + frontPageEvents[i].homepageBulletTwo + '</span>';
            } else if (!frontPageEvents[i].homepageBulletTwo) {
              slides += '<br /><span class="sub-title"></span>';
            }
            if (frontPageEvents[i].homepageBulletThree) {
              slides += '<br /><span class="sub-title"><i class="fa fa-code"></i> ' + frontPageEvents[i].homepageBulletThree + '</span>';
            } else if (!frontPageEvents[i].homepageBulletThree) {
              slides += '<br /><br /><span class="sub-title"></span>';
            }*/
            slides += '</h2></a></span><img src="./uploads/' + frontPageEvents[i].eventSlideshowImage + '" /></li>';
          }
          newHtml = html.toString().replace('<ul class="slideshow">', slides);
          res.send(newHtml);
        });
      });
    });
  });

router.route('/future-events')
.get(function (req, res) {
  var eventBlocksHtml = '<main class="events grid"><section class="col_12 internetExplorer">';
  var newHtml = '';
  var colNum = 4;
  var backgroundColors = shuffle(msColors);
  var numFutureBlocks = 4;
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
        for (var i = 0; i < numFutureBlocks; i++) {
          var risingText = '';
          /*if (!upcomingEvent[i].eventFuturePageImage && upcomingEvent[i].eventSlideshowImage) {
            upcomingEvent[i].eventFuturePageImage = upcomingEvent[i].eventSlideshowImage;
          }
          if (!upcomingEvent[i].eventFuturePageImage && !upcomingEvent[i].eventSlideshowImage) {
            upcomingEvent[i].eventFuturePageImage = randomTabImages[Math.floor(Math.random() * 4)];
          }*/
          // this is the rising upcoming block, un comment it to bring it back
          /*if (upcomingEvent[i].eventFuturePageText) {
            risingText = '<div class="rising_text"><a href="/event/' + upcomingEvent[i].eventUrl + '">' + upcomingEvent[i].eventFuturePageText + '</div>';
          }*/
          eventBlocksHtml += '<div class="col_' + 12 / numFutureBlocks + ' event_block" style="background-color: #' + continentColors[upcomingEvent[i].eventContinent] + ';"><a href="/' + upcomingEvent[i].eventUrl + '"><p>More Details</p><h1>' + upcomingEvent[i].eventLocation + '</h1><h3>' + upcomingEvent[i].eventName + '<br />' + months[upcomingEvent[i].eventStartDate.getMonth()] + ' ' + upcomingEvent[i].eventStartDate.getDate() + ' - ' + upcomingEvent[i].eventEndDate.getDate() + ', ' + upcomingEvent[i].eventEndDate.getFullYear() + '</h3></a>' + risingText + '</div>';
        }
        eventBlocksHtml += '</section>';
        newHtml = html.toString().replace('<main class="events grid">', eventBlocksHtml);
        res.send(newHtml);
      })
    })
  })
})
  
  router.route('/events')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Event.findAll({where: {eventStartDate:{ $gte: new Date()}}})
      .then(function (data) {
        data.sort(function (a, b) {
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
        res.json(data);
      });
    });
  });

router.route('/allevents/:eventId')
.get(function (req, res) {
  var picsHtml = '<div class="col_12 gallery">';
  var returnObj = {};
  sql.sync()
  .then(function () {
    Event.findOne({where: {id: req.params.eventId}})
    .then(function (data) {
      fs.readdir(path.join(__dirname, '../uploads/' + data.eventUrl), function (err, files) {
        for (var key in files) {
          picsHtml += '<a href="../uploads/' + data.eventUrl + '/' + files[key] + ' rel="gallery" class="fancybox" type="image" ><img src="../uploads/' + data.eventUrl + '/' + files[key] + '" width="100" height="100" /></a>';
        }
        picsHtml += '</div>';
        /*for (var i = 0, j = files.length; i < j; i++) {
          files[i] = '../uploads/' + data.eventUrl + '/' + files[i];
        }*/
        var testHtml = '<div class="col_12 gallery"><a href="../uploads/shanghaiinteropdevdays2015-2026/_MG_3990.JPG" rel="gallery"><img src="../uploads/shanghaiinteropdevdays2015-2026/_MG_3990.JPG" width="100" height="100" /></a><a href="../uploads/shanghaiinteropdevdays2015-2026/_MG_4077.JPG" rel="gallery"><img src="../uploads/shanghaiinteropdevdays2015-2026/_MG_4077.JPG" width="100" height="100" /></a></div>';
        returnObj.eventUrl = data.eventUrl;
        returnObj.picsHtml = picsHtml;
        returnObj.files = files;
        res.json(returnObj);
      })
    })
  })
})

  
/*  router.route('/eventoverviews')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      EventOverview.findAll()
      .then(function (data) {
        res.json(data);
      })
    })
  })*/
  
  router.route('/eventschedules')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      EventSchedule.findAll()
      .then(function (data) {
        res.json(data);
      })
    })
  })
  
/*  router.route('/sponsors')
  .get(function (req, res) {
    var allSponsors = []
    sql.sync()
    .then(function () {
      EventPlatinumSponsor.findAll()
      .then(function (platinumSponsors) {
        EventGoldSponsor.findAll()
        .then(function (goldSponsors) {
          EventSilverSponsor.findAll()
          .then(function (silverSponsors) {
            EventBronzeSponsor.findAll()
            .then(function (bronzeSponsors) {
              allSponsors.push(platinumSponsors, goldSponsors, silverSponsors, bronzeSponsors);
              res.json(allSponsors);
            })
          })
        })
      })
    })
  })*/
  
  router.route('/contacts')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Contact.findAll()
      .then(function (data) {
        res.json(data);
      })
    })
  })
  
  router.route('/attendees')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      EventAttendee.findAll()
      .then(function (data) {
        res.json(data);
      })
    })
  })
  
/*  router.route('/travelinfo')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      EventTravel.findAll()
      .then(function (data) {
        res.json(data);
      })
    })
  })*/
  
 /* router.route('/accommodationinfo')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      TravelAccommodation.findAll()
      .then(function (data) {
        res.json(data);
      })
    })
  })*/
  
  // router.route('/traveltips')
  // .get(function (req, res) {
  //   sql.sync()
  //   .then(function () {
  //     TravelTip.findAll()
  //     .then(function (data) {
  //       res.json(data);
  //     })
  //   })
  // })
  
/*  router.route('/travelrestaurants')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      TravelRestaurant.findAll()
      .then(function (data) {
        res.json(data);
      })
    })
  })*/
  
/*  router.route('/extratravelsections')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      AdditionalTravelSection.findAll()
      .then(function (data) {
        console.log(clc.green.bold(data));
        res.json(data);
      })
    })
  })
  */
  router.route('/upcomingeventurls')
  .get(function (req, res) {
    sql.sync()
    .then(function () {
      Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
      .then(function (data) {
        var theUrls = [];
        for (var i = 0; i < data.length; i++) {
          var tmpObj = {};
          tmpObj.url = data[i].eventUrl;
          tmpObj.eventName = data[i].eventName;
          theUrls.push(tmpObj);
        }
        res.json(theUrls);
      })
    })
  })
  
  /*sql.sync()
  .then(function () {
    Event.findAll()
    .then(function (data) {
      var testArr = [];
      for (var i = 0; i < data.length; i++) {
        testArr.push(data[i].eventUrl);
      }
    })
  })
  */
  //This route has to be last or it will override the other routes
  router.route('/:eventName')
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
          res.send(path.join(__dirname, '../views/thank-you.html')); //I need to make a 404 page
        }
      })
    })
  })
  
/*  router.route('/futureevents')
  .get(function (req, res) {
    var theEvents = {};
    sql.sync()
    .then(function () {
      Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
      .then(function (eventsData) {
        for (var key in eventsData) {
          theEvents[eventsData[key].id] = eventsData[key];
        }
        for (var key2 in theEvents) {
          EventAttendee.findAll({where: {eventId: theEvents[key2].id, eventAttendeeRole: 'speaker'}})
          .then(function (speakersIds) {
            for (var key3 in speakersIds) {
              Contact.findAll({where: {id: speakersIds[key3].attendeeId}})
              .then(function (theSpeakers) {
                theEvents[key].speakers = theEvents[key].speakers;
                console.log(clc.green('!!!!!!!!! :::::::::::::::   '),  theEvents[key].speakers);
                res.json(theEvents);
                
              })
            }

          })
        }
      })
    })
  })*/


// make dynamic routes for events
//Read the blank html file to us for a template
/*fs.readFile(path.join(__dirname, '../views/blank-event.html'), function (err, data) {
  var theHtml = data.toString();
  var theSpeakersHtml = '<div id="eventSpeakers" class="tab-content">';
  var theOverViewHtml = '<div id="event-overview" class="tab-content">';
  var theScheduleUl = '<div id="event-schedule" class="tab-content"><ul class="tabs center">';
  var theScheduleTableBody = '';
  var mediaSponsorTab = '<div id="eventSponsors" class="tab-content">';
  var mapTab = '<div id="travelTab" class="tab-content">';
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
        // console.log(eventsTable[i].eventUrl)
        var thisEventName = eventsTable[i].eventName;
        var thisEventId = eventsTable[i].id; 
        //search for EventOverview table that has the id as the current event
        EventOverview.findAll({where: {eventId: thisEventId}})
        .then(function (overviewTable) {
          //insert the current event name in h2 tags
          theOverViewHtml += '<h2>' + thisEventName + '</h2>';
          // console.log('CONSOLE LOG :::::::  ', theOverViewHtml);
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
              var speakerIdArr = [];
              //loop over the Contacts table to find the speakers of the current event
              for (var m = 0; m < attendeeTable.length; m++) {
                speakerIdArr.push(attendeeTable[m].attendeeId);
              }
              Contact.findAll({where: {id: speakerIdArr}})
              .then(function (speakersTable) {
                theSpeakersHtml += '<h2>' + thisEventName + '</h2><hr />'
                for (var mm = 0; mm < speakersTable.length; mm++) {
                  theSpeakersHtml += '<h4>' + speakersTable[mm].firstName + ' ' + speakersTable[mm].lastName + '</h4><h5>' + speakersTable[mm].msTeamTitle + '</h5><p><img class="pull-left" src="data:image;base64,' + speakersTable[mm].headShot + '" />' + speakersTable[mm].contactDescription + '</p><hr />';
                }
                  theHtml = theHtml.replace('<div id="eventSpeakers" class="tab-content">', theSpeakersHtml);
              })
              EventSponsorInfo.findAll({where: {eventId: thisEventId}})
              .then(function (sponsorInfo) {
                for (var ii = 0; ii < sponsorInfo.length; ii++) {
                  mediaSponsorTab += '<h2>' + sponsorInfo[ii].sponsorshipHeading + '</h2><hr class="alt1" /><p>' + sponsorInfo[ii].sponsorshipParagraph + '</p><hr class="alt1" />';
                }
                EventPlatinumSponsor.findAll({where: {eventId: thisEventId}})
                .then(function (platinumSponsors) {
                  mediaSponsorTab += '<h3>Platinum Sponsors</h3>';
                  for (var jj = 0; jj < platinumSponsors.length; jj++) {
                    mediaSponsorTab += '<div class="col_6"><img src="../../img/' + platinumSponsors[jj].sponsorLogo + '"><h4>' + platinumSponsors[jj].sponsorName + '</h4><p>' + platinumSponsors[jj].sponsorDesc + '</p></div>';
                  }
                  mediaSponsorTab += '<hr class="alt1" />';
                  EventGoldSponsor.findAll({where: {eventId: thisEventId}})
                  .then(function (goldSponsors) {
                    mediaSponsorTab += '<h3>Gold Sponsors</h3>';
                    for (var kk = 0; kk < goldSponsors.length; kk++) {
                    mediaSponsorTab += '<div class="col_6"><img src="../../img/' + goldSponsors[kk].sponsorLogo + '"><h4>' + goldSponsors[kk].sponsorName + '</h4><p>' + goldSponsors[kk].sponsorDesc + '</p></div>';
                    }
                    mediaSponsorTab += '<hr class="alt1" />';
                    EventSilverSponsor.findAll({where: {eventId: thisEventId}})
                    .then(function (silverSponsors) {
                      mediaSponsorTab += '<h3>Silver Sponsors</h3>';
                      for (var ll = 0; ll < silverSponsors.length; ll++) {
                        mediaSponsorTab += '<div class="col_6"><img src="../../img/' + silverSponsors[ll].sponsorLogo + '"><h4>' + silverSponsors[ll].sponsorName + '</h4><p>' + silverSponsors[ll].sponsorDesc + '</p></div>';
                      }
                      mediaSponsorTab += '<hr class="alt1" />';
                      EventBronzeSponsor.findAll({where: {eventId: thisEventId}})
                      .then(function (bronzeSponsors) {
                        mediaSponsorTab += '<h3>Bronze Sponsors</h3>';
                        for (var mm = 0; mm < bronzeSponsors.length; mm++) {
                          mediaSponsorTab += '<div class="col_6"><img src="../../img/' + bronzeSponsors[mm].sponsorLogo + '"><h4>' + bronzeSponsors[mm].sponsorName + '</h4><p>' + bronzeSponsors[mm].sponsorDesc + '</p></div>';
                        }
                        mediaSponsorTab += '</div>';
                        theHtml = theHtml.replace('<div id="eventSponsors" class="tab-content">', mediaSponsorTab);
                        EventTravel.findAll({where: {eventId: thisEventId}})
                        .then(function (map) {
                          for (var nn = 0; nn < map.length; nn++) {
                            mapTab += '<h2>' + map[nn].aboveMapHeader + '</h2>' + map[nn].mapImapHtml;
                          }
                          theHtml = theHtml.replace('<div id="travelTab" class="tab-content">', mapTab);
                          console.log(eventEndpoints);
                          router.get('/' + eventsTable[i - 1].eventUrl, function (req, res) {
                            res.send(theHtml);
                          })
                        })
                        //send string of thml with all info to client
                      })
                    })
                  })
                });
              });
            });
          });
        });
      }
    });
  });
});*/

/*fs.readFile(path.join(__dirname, '../views/blank-event.html'), function (err, data) {
  var theHtml = data.toString();
  var index = 0;
  sql.sync()
  .then(function () {
    Event.findAll({where: {eventStartDate: {$gte: new Date()}}})
    .then(function (events) {
      var eventEndpoints = [];
      for (var i = 0; i < events.length; i++) {
        eventEndpoints.push(events[i].eventUrl);
      }
      for (var j = 0; j < events.length; j++) {
        EventOverview.findAll({where: {eventId: events[j].id}})
        .then(function (overviews) {
          var overviewHeadings = '<div id="event-overview" class="tab-content">';
          for (var k = 0; k < overviews.length; k++) {
        overviewHeadings += '<h2>' + overviews[k].headingText + '</h2>';
            
          }
        theHtml.replace('<div id="event-overview" class="tab-content">',  overviewHeadings);
        console.log(overviewHeadings);
        })
        router.get('/' + events[j].eventUrl, function (req, res) {
          res.send(theHtml);
        });
      }
      
    })
  })
});*/

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