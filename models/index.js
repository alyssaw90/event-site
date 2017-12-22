// Connects to site to local, test, or live database

'use strict';
const clc = require('cli-color');
let Sql = require('sequelize');
//LOCAL DATABASE
/*let sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});/

//LOCAL DATABASE
/*let sql = new Sql(process.env.DB_TEST_NAME, process.env.DB_TEST_USER, process.env.DB_TEST_PASS, {
  host: process.env.DB_TEST_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});*/

//DEVELOPMENT/TEST DATABASE
let sql = new Sql(process.env.DB_DEV_NAME, process.env.DB_DEV_USER, process.env.DB_DEV_PASS, {
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

//LIVE DATABASE
/* let sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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
}); */

//load models
let models = ['Speaker', 'Event', 'EventTab', 'EventSpeakersAsscs', 'Surveys'];

models.forEach(function(model) {
    module.exports[model] = sql.import(__dirname + '/' + model);
});
//create model associations
sql.sync();
sql.models.Event.belongsToMany(sql.models.Speaker, { through: sql.models.EventSpeakersAsscs });
sql.models.Speaker.belongsToMany(sql.models.Event, { through: sql.models.EventSpeakersAsscs });
sql.models.Event.belongsToMany(sql.models.EventTab, { through: 'EventsTabsAccsc' });
sql.models.EventTab.belongsToMany(sql.models.Event, { through: 'EventsTabsAccsc' });
// sql.models.Slide.belongsToMany(sql.models.Slideshow, {through: sql.models.SlideshowSlideAssc});
// sql.models.Slideshow.belongsToMany(sql.models.Slide, {through: sql.models.SlideshowSlideAssc});



//export connection
module.exports.sql = sql;