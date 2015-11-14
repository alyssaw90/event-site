'use Strict';

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