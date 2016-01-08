/*'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var NewsletterSignup = module.exports = sql.define('NewsletterSignup', {
  email: Sql.STRING,
  firstName: Sql.STRING,
  lastName: Sql.STRING,
  title: Sql.STRING,
  bizName: Sql.STRING
	});

NewsletterSignup.sync({force: false});*/


// force creation of table if it doesn't exist already
// SuggestedCity.sync({force: true})
// .then(function () {
//   // Table created
//   return SuggestedCity.create({
//     city:'Seattle',
//   email: 'test@example.com'
//   });
// });
