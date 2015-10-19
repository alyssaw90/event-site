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

var Contact = module.exports = sql.define('Contact', {
  firstName: Sql.STRING,
  lastName: Sql.STRING,
  email: {
    type: Sql.STRING,
    // unique: true,
    validate: {
      isEmail: true
    }
  },
  newsletterSubscription: Sql.BOOLEAN,
  divId: Sql.STRING,
  description: Sql.STRING,
  role: Sql.ENUM('speaker', 'attendee'),
  msTeamMember: Sql.BOOLEAN,
  showOnHomePage: Sql.BOOLEAN,
  headShot: Sql.STRING,
  company: Sql.STRING,
  address: Sql.STRING,
  country: Sql.STRING,
  recommendedCity: Sql.STRING,
  interestId: Sql.INTEGER,
  attendedEvent: Sql.INTEGER,
  allowNotifications: Sql.BOOLEAN,
  allowPersonalInfoSharing: Sql.BOOLEAN
});

// create table if it doesn't already exist ```({force: true})``` will cause the table to be deleted and created regardless of if it exists already
Contact.sync({force: false});



// force creation of table if it doesn't exist already
// Contact.sync({force: true})
// .then(function () {
//   // Table created
//   return Contact.create({
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'test@example.com',
//   divId: 'john-doe',
//   description: 'some guy',
//   role: 'master of the universe',
//   headShot: '',
//   company: 'ms',
//   newsletterSubscription: false,
//   address: '',
//   recommendedCity: ''
//   });
// });

