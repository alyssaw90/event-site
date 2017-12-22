/**************************************
* START OF DEPRECATED CONSUMER ROUTES *
***************************************/ 
 
 //route to send Bing Map API key to front end
//  router.route('/bingmapkey')
//  .get( (req, res) => {
//    res.json(process.env.BING_MAP_API_KEY);
//  });


 //get all events for edit events tab
//  router.get('/mapevents', (req, res) => {
//    models.sql.sync()
//      .then( () => {
//        return Event.findAll({
//          where: {
//            eventLocation: {
//              $not: null
//            },
//            isPublished: true
//          }
//        });
//      })
//      .then( (events) => {
//        res.json(events);
//      });
//  });  

/************************************ 
* END OF DEPRECATED CONSUMER ROUTES *
*************************************/

/*************************************** 
 * START OF DEPRECATED ADMIN ROUTES *
 ***************************************/

  //route to send slides related to a slideshow
//   router.get('/slideshow/:slideName', (req, res) => {
//     models.sql.sync()
//     .then( () => {
//       return Slideshow.findOne({
//         where: {
//           slideshowName: req.params.slideName
//         }
//       });
//     })
//     .then( (slideshowData) => {
//       return slideshowData.getSlides();
//     })
//     .then( (slides) => {
//       res.json(slides);
//     })
//   });
//   //route to get all slides
//   router.get('/allslides', (req, res) => {
//     models.sql.sync()
//     .then( () => {
//       return Slide.findAll();
//     })
//     .then( (slides) => {
//       res.json(slides);
//     })
//   });

  //route to set homepage slides
//   router.post('/sethomepageslides', (req, res) => {
//     models.sql.sync()
//     .then( () => {
//       return Slideshow.findOne({
//         where: {
//           slideshowName: 'homepageSlideshow'
//         }
//       });
//     })
//     .then( (slideshow) => {
//       models.sql.sync()
//       slideshow.setSlides([])
//       .then( () => {
//         models.sql.sync()
//         .then( () => {
//           for (let i = 0, len = req.body.length; i < len; i++) {
//             slideshow.addSlide(req.body[i].id, {sortPosition: i});
//           }
//           res.end();
          
//         });
//       });
//     });
//   });

 // route to add slide to homepage slides
//   router.post('/addslide',  (req, res) => {
//     models.sql.sync()
//     .then( () => {
//       Slide.create({
//         imgSrcUrl: req.body.imgSrcUrl,
//         imgDestUrl: req.body.imgDestUrl,
//         title: req.body.title,
//         altText: req.body.altText
//       })
//       res.end('slide saved');
//     });
//   });

// route to delete slides from admin portal
//   router.post('/deleteslide',  (req, res) => {
//     models.sql.sync()
//     .then(() => {
//       return Slide.destroy({
//         where: {
//           id: {
//             $in: req.body
//           }
//         }
//       });      
//     })
//     .then(() => {
//       res.status('200').end();
//     })
//     .error( () => {
//       res.status('501').end();
//     })
//   });

/*********************************
* END OF DEPRECATED ADMIN ROUTES *
*********************************/

/*********************************
* START OF DEPRECATED AUTH ROUTES *
*********************************/

   //verify login
//    router.get('/user/checklogin',  (req, res) => {
//     res.json({msg: `logged in`});
//   });

  //get user info
//   router.get(`/user/accountinfo`,  (req, res) => {
//     res.json({user: req.user});
//   })

// 'use strict';

// // require('dotenv').load();
// // let User = require('../models/User');
// const bodyparser = require('body-parser');
// // const cookieParser = require('cookie-parser');
// const clc = require('cli-color');
// const session = require('express-session');
// const models = require('../models');
// const userLogging = require(`../scripts/userLogging`)();
// const isLoggedIn = userLogging.isLoggedIn;
// const isLoggedInAdmin = userLogging.isLoggedInAdmin;
// const User = models.User;
// const Speaker = models.Speaker;
// const Event = models.Event;
// const EventTab = models.EventTab;
// const MsUser = models.MsUser;

// function makeRandomString () {
//   let outputString = '';
//   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
//   let randomNumber = Math.ceil(Math.random() * 10) + 10;
//   for ( let i = 0; i < randomNumber; i++ ) {
//     outputString += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return outputString;
// }

// models.sql.authenticate()
//   .then(function (err) {
//     if (err) {
//       console.log(clc.xterm(46)('Unable to connect to the database with auth router: '), err);
//     } else {
//       console.log(clc.xterm(46)('Connection has been established successfully with auth router.'));
//     }
//   });

// module.exports = function(router, passport) {
// 	router.use(bodyparser.json());
//   router.use(bodyparser.urlencoded({
//     extended: true
//   }));

// 	router.route('/user')
//   .get(isLoggedIn, (req, res) => {
//     let user = {};
//     models.sql.sync()
//     .then( () => {
//       if (req.user.strategy === 'basic') {
//         return User.findOne({
//           where: {
//             id: req.user.id
//           }
//         });
//       }
//     })
//     .then( (basicUser) => {
//       if (req.user.strategy === 'AzureAD') {
//         user.name = `${req.user.given_name} ${req.user.family_name}`,
//         user.email = req.user.unique_name,
//         user.interopAdmin = req.user.interopAdmin,
//         user.strategy = req.user.strategy
//       } else if (req.user.strategy === 'basic') {
//         user.id = basicUser.id,
//         user.name = basicUser.userName,
//         user.email = basicUser.email,
//         user.strategy = req.user.strategy
//         user.interopAdmin = basicUser.isAdmin
//       }
//       res.json(user);
//     })
//   })
// 	.post(isLoggedInAdmin, (req, res) => {
// 		models.sql.sync()
// 		.then(function() {
// 			return User.find({where: {email: req.body.email}});
//     })
// 		.then(function(user) {
// 			if (user) {
// 				res.status(419).json({msg: 'email address alread in use'});
// 			}
// 			if (!user) {
//         let pw = req.body.password;
//         delete req.body.password;
// 				return User.create({
//           userName: req.body.name, 
//           email: req.body.email,
//           isAdmin: req.body.isAdmin, 
//           randomString: makeRandomString(),
//           password: pw
//         });
//       }
//     })
//     .then( (newUser) => {             
//       res.json({msg: `User created successfully`});
//     })
//     .catch( (err) => {
//       res.status(500).json({err: err});
//     })
// 	})
//   .patch(isLoggedIn, (req, res) => {
//     models.sql.sync()
//     .then( () => {
//       return User.findOne({
//         where: {
//           id: req.body.id
//         }
//       });
//     })
//     .then( (user) => {
//       let hasNewPw = req.body.password ? true : false;
//       let newPw = req.body.password;
//       delete req.body.password;
//       if (hasNewPw) user.update({password: newPw});
//       newPw = undefined;
//       if (req.body.name) user.update({userName: req.body.name});
//       if (req.body.email) user.update({email: req.body.email})
//       if (req.body.isAdmin === true || req.body.isAdmin === false) user.update({isAdmin: req.body.isAdmin});             
//       res.json({msg: `user updated`});
//     })
//   });

//   router.delete(`/user/:slug`, isLoggedInAdmin, (req, res) => {
//     models.sql.sync()
//     .then(() => {
//       return User.findOne({
//         where: {
//           id: req.params.slug
//         }
//       })
//     })
//     .then((userToDelete) => {
//       userToDelete.destroy();
//       res.end();
//     })
//   })

//   router.route(`/allusers`)
//   .get(isLoggedInAdmin, (req, res) => {
//     let output = {};
//     models.sql.sync()
//     .then( () => {
//       return User.findAll();
//     })
//     .then( (localUsers) => {
//       let localUserArr = [];
//       for (let i = 0, j = localUsers.length; i < j; i++) {
//         let tmpObj = {
//           id: localUsers[i].id,
//           userName: localUsers[i].userName,
//           email: localUsers[i].email,
//           isAdmin: localUsers[i].isAdmin,
//           strategy: `basic`
//         }
//         localUserArr.push(tmpObj);
//       }
//       output.localUsers = localUserArr;
//     })
//     .then( () => {
//       return MsUser.findAll();
//     })
//     .then( (msUsers) => {
//       output.msUsers = msUsers;
//       for (let i = 0, j = output.msUsers.length; i < j; i++) {
//         output.msUsers[i].strategy = `AzureAD`
//       }
//       res.json(output);
//     });
//   });

//   router.route('/msusers')
//   .post(isLoggedInAdmin, (req, res) => {
//     models.sql.sync()
//     .then(() => {
//       MsUser.create(req.body);
//       res.end();
//     })
//   })
//   .patch(isLoggedInAdmin, (req, res) => {
//     models.sql.sync()
//     .then(() => {
//       return MsUser.findOne({
//         where: {
//           id: req.body.id
//         }
//       });
//     })
//     .then( (msUser) => {
//       msUser.update({isAdmin: req.body.isAdmin});
//       res.end();      
//     });
//   });
//   router.delete(`/msusers/:slug`, isLoggedInAdmin, (req, res) => {
//     models.sql.sync()
//     .then(() => {
//       return MsUser.findOne({
//         where: {
//           id: req.params.slug
//         }
//       })
//     })
//     .then((msUserToDelete) => {
//       msUserToDelete.destroy();
//       res.end();
//     })
//   })


//   router.get('/login', passport.authenticate('basic', { session: true }), (req, res) => {
//     let userJSON = {randomString: req.user.dataValues.randomString, id: req.user.dataValues.id};
//     res.req.headers.authorization = 'hahaha';
//     // res.req.rawHeaders.Authorization = 'blah';
//     for (let key in res.req.rawHeaders) {
//       if (res.req.rawHeaders[key].slice(0, 5) === 'Basic') {
//         res.req.rawHeaders[key] = 'Basic xxxx';
//       }
      
//     }
//     req.user.$modelOptions.instanceMethods.generateToken(userJSON, process.env.SECRET_KEY, (err, token) => {
//       if (err) {
//           console.log(err);
//           return res.status(500).json({msg: 'error generating token'});
//       }
//       req.session.cookie.maxAge = 1000 * 60 * 60;
//       res.status('200').end();
//     });
//   });

//   router.get(`/azurelogin`, passport.authenticate(`provider`, {successRedirect: `/admin/redirect`}));

//   // router.get(`/.auth/login/aad/callback`, passport.authenticate(`provider`, { successRedirect: `/admin/redirect`, failureRedirect: `/admin/login` }), function (req, res) { 
//   //   res.redirect(`/`); 
//   // });

  
//   router.get('/logout', function(req, res) {
//     req.logout();
//     res.json({msg: 'logged off'});
//   });

// };

/*********************************
* END OF DEPRECATED AUTH ROUTES *
*********************************/