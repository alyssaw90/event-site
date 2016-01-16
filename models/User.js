'use Strict';

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

var EncryptedField = require('sequelize-encrypted');

// secret key should be 32 bytes hex encoded (64 characters)
var key = process.env.SECRET_KEY_HERE;

var enc_fields = EncryptedField(Sql, key);

var User = module.exports = sql.define('User', {
  name: Sql.STRING,
  encrypted: enc_fields.vault('encrypted')
});

/*var user = User.build();
user.private_1 = 'test';*/

User.sync({force: true});