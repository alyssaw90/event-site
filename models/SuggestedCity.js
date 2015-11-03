'use strict';

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

var SuggestedCity = module.exports = sql.define('SuggestedCity', {
  city: Sql.STRING,
  contactId: Sql.INTEGER
});


// force creation of table if it doesn't exist already
SuggestedCity.sync({force: false})
/*.then(function () {
  // Table created
  return SuggestedCity.create({
    city:'Seattle',
    contactId: 1
  });
});*/
