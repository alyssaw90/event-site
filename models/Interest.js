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

var Interest = module.exports = sql.define('Interest', {
  contactId: Sql.INTEGER,
  sharePointFileOperations: Sql.BOOLEAN,
  officeClient: Sql.BOOLEAN,
  windowsFileSharingProtocols: Sql.BOOLEAN,
  windowsIdentityActiveDirectoryAndAuthenticationProtocols: Sql.BOOLEAN,
  kerberosAuthentication: Sql.BOOLEAN,
  exchangeRPC: Sql.BOOLEAN,
  exchangeWebServices: Sql.BOOLEAN,
  exchangeActiveSync: Sql.BOOLEAN,
  bringYourOwnDevice: Sql.BOOLEAN,
  sqlServer: Sql.BOOLEAN,
  oDataREST: Sql.BOOLEAN,
  otherProtocol: Sql.BOOLEAN,
  windows: Sql.BOOLEAN,
  ios: Sql.BOOLEAN,
  unix: Sql.BOOLEAN,
  linux: Sql.BOOLEAN,
  otherOS: Sql.BOOLEAN,
  intel: Sql.BOOLEAN,
  arm: Sql.BOOLEAN,
  openComputePlatform : Sql.BOOLEAN,
  otherHardware: Sql.BOOLEAN
});

Interest.sync({force: false});


