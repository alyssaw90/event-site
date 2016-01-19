'use strict';

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

var SuggestedCity = module.exports = sql.define('SuggestedCity', {
  city: Sql.STRING,
  contactId: Sql.INTEGER
});


// force creation of table if it doesn't exist already
// SuggestedCity.sync({force: false});
/*.then(function () {
  // Table created
  return SuggestedCity.create({
    city:'Seattle',
    contactId: 1
  });
});*/
