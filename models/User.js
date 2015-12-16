'use Strict';

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
/*var sql = new Sql('Driver={SQL Server Native Client 11.0};Server=tcp:interopeventstestserver.database.windows.net,1433;Database=InteropEventsDBTest;Uid=EventAdmin@interopeventstestserver;Pwd={Event.4ever!};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;', {
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql('InteropEventsDBTest', 'EventAdmin', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
  dialect: 'mssql',
  port: 1433,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
var EncryptedField = require('sequelize-encrypted');

// secret key should be 32 bytes hex encoded (64 characters)
var key = process.env.SECRET_KEY_HERE;

var enc_fields = EncryptedField(Sql, key);

var User = module.exports = sql.define('User', {
  name: Sql.STRING,
  encrypted: enc_fields.vault('encrypted')
})

/*var user = User.build();
user.private_1 = 'test';*/

User.sync({force: true})