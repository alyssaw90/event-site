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
  email: {
    type: Sql.STRING,
    allowNull: true,
    validate:  {
      isEmail: true
    }
  }
});

SuggestedCity.sync();


// force creation of table if it doesn't exist already
// SuggestedCity.sync({force: true})
// .then(function () {
//   // Table created
//   return SuggestedCity.create({
//     city:'Seattle',
//   email: 'test@example.com'
//   });
// });
