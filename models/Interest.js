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

// Interest.sync({force: false});


