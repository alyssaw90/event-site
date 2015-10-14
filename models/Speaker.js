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

var Speaker = module.exports = sql.define('Speaker', {
  firstName: Sql.STRING,
  lastName: Sql.STRING,
  position: Sql.STRING,
  headShot: Sql.STRING,
  description: Sql.STRING,
  divId: {
    type: Sql.STRING,
    set: function () {
      var theId = this.firstName + '-' + this.lastName;
      console.log('GGGGGG', theId);
      return this.setDataValue('divId', theId);
    }
  }
});

// Speaker.sync();


// force creation of table if it doesn't exist already
Speaker.sync({force: true})
.then(function () {
  // Table created
  return Speaker.create({
    firstName: 'Bob',
    lastName: 'Smith',
    position: 'Boss of Bosses',
    headShot: "../../img/rich-mclain-headshot.jpg",
    description: 'Some guy',
  });
});

