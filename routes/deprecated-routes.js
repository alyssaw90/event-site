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

   //verify login
//    router.get('/user/checklogin',  (req, res) => {
//     res.json({msg: `logged in`});
//   });

  //get user info
//   router.get(`/user/accountinfo`,  (req, res) => {
//     res.json({user: req.user});
//   })