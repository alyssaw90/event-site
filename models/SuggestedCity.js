'use strict';

var Sql = require('sequelize');
/*var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql('InteropEventsDBTest', 'EventAdmin@interopeventstestserver', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
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
/*var sql = new Sql('Driver={SQL Server Native Client 11.0};Server=tcp:interopeventstestserver.database.windows.net,1433;Database=InteropEventsDBTest;Uid=EventAdmin@interopeventstestserver;Pwd={Event.4ever!};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;', {
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
*/
/*var sql = new Sql('InteropEventsDBTest', 'EventAdmin', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
  dialect: 'mssql',
  port: 1433,
  driver: 'tedious',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
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
