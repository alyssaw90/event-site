'use Strict';

var clc = require('cli-color');

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
/*var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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
});*/

var EncryptedField = require('sequelize-encrypted');

// secret key should be 32 bytes hex encoded (64 characters)
var key = process.env.SECRET_KEY_HERE;

var enc_fields = EncryptedField(Sql, key);

var User = module.exports = sql.define('User', {
  userName: Sql.STRING,
  password: enc_fields.vault('password'),
  email: Sql.STRING
});

/*var user = User.build();
user.private_1 = 'test';*/

//User.sync({force: false});

User.sync({force: true})
.then(function () {
  console.log(clc.blue('::::::::     '), sql.databaseVersion());
})
.then(function () {
  return User.create({
  userName: 'TestUser',
  password: 'password',
  email: 'email@example.com'  
  });
})
.then(function () {
  console.log(clc.green('User created'));
})