'use Strict';

require('dotenv').load();
var clc = require('cli-color');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

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

/*var sql = new Sql(process.env.DB_DEV_NAME, process.env.DB_DEV_USER, process.env.DB_DEV_PASS, {
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

// var EncryptedField = require('sequelize-encrypted');

// secret key should be 32 bytes hex encoded (64 characters)
// var key = process.env.SECRET_KEY;

// var enc_fields = EncryptedField(Sql, key);

var User = module.exports = sql.define('User', {
  userName: Sql.STRING,
  // password: enc_fields.vault('password'),
  password: Sql.STRING,
  email: Sql.STRING,
  randomString: Sql.STRING,
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
  var outputString = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
  var randomNumber = Math.ceil(Math.random() * 10) + 10;
  for ( var i = 0; i < randomNumber; i++ ) {
    outputString += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return outputString;
}

User.sync({force: true})
.then(function() {
  console.log(clc.blue('::::::::     '), sql.databaseVersion());
})
.then(function () {
  return User.create({
  userName: 'TestUser',
  password: bcrypt.hashSync('!nt3r0p', bcrypt.genSaltSync(8), null),
  email: 'curriculum@interopevents.com',
  randomString: makeRandomString(),
  isAdmin: false
  });
})
.then(function () {
  return User.create({
  userName: 'Admin',
  password: bcrypt.hashSync('!nt3r0p', bcrypt.genSaltSync(8), null),
  email: 'admin@interopevents.com',
  randomString: makeRandomString(),
  isAdmin: true
  });
})
.then(function() {
  console.log(clc.green('User created'));
  return User.findOne({
  where: {
    email: 'curriculum@interopevents.com'
  }
  })
  .then(function(user) {
    // var pwComp = bcrypt.hashSync('password', bcrypt.genSaltSync(8), null);
    var pw =    user.$modelOptions.instanceMethods.verifyPassword('!nt3r0p', user.dataValues.password);
    // var testF = user.$modelOptions.instanceMethods.testFunc;
    // var gh = user;
    console.log(clc.yellow('   ::::::    '), pw);
  })
});
