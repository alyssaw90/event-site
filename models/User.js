'use strict';

require('dotenv').load();
let clc = require('cli-color');
let bcrypt = require('bcrypt-nodejs');
let eat = require('eat');

let Sql = require('sequelize');
let sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
/*let sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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

/*let sql = new Sql(process.env.DB_DEV_NAME, process.env.DB_DEV_USER, process.env.DB_DEV_PASS, {
  host: process.env.DB_DEV_HOST,
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
*/

// let EncryptedField = require('sequelize-encrypted');

// secret key should be 32 bytes hex encoded (64 characters)
// let key = process.env.SECRET_KEY;

// let enc_fields = EncryptedField(Sql, key);

let User = module.exports = sql.define('User', {
  userName: Sql.STRING,
  // password: enc_fields.vault('password'),
  password: {
    type: Sql.STRING,
    set: function(val) {
      this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(8), null))
    }
  },
  email: Sql.STRING,
  randomString: {
    type: Sql.STRING,
    set: function(val) {
      this.setDataValue('randomString',  makeRandomString())
    }
  },
  isAdmin: Sql.BOOLEAN
},
{
  // paranoid: true,
  instanceMethods: {
    verifyPassword: function(password, userPassword) {
      return bcrypt.compareSync(password, userPassword);
    },
    generateToken: function(userInfo, secret, callback) {
      return eat.encode(userInfo, secret, callback);
    },
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
    
  }

});

function makeRandomString () {
  let outputString = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
  let randomNumber = Math.ceil(Math.random() * 10) + 10;
  for ( let i = 0; i < randomNumber; i++ ) {
    outputString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return outputString;
}
