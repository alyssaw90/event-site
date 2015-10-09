'use strict'

var Sql = require('sequelize');
var sql = new Sql('events_page', 'test1', 'p@ssw0rd1', {
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
  email: Sql.INTEGER
	});

SuggestedCity.sync();
// SuggestedCity.sync({force: true})
// .then(function () {
//   // Table created
//   return SuggestedCity.create({
//     city:'Seattle',
//   email: 'test@example.com'
//   });
// });
