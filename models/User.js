'use Strict';

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

// var EncryptedField = require('sequelize-encrypted');

// secret key should be 32 bytes hex encoded (64 characters)
// var key = process.env.SECRET_KEY;

// var enc_fields = EncryptedField(Sql, key);

var User = module.exports = sql.define('User', {
  userName: Sql.STRING,
  // password: enc_fields.vault('password'),
  password: {
    type: Sql.TEXT,
    set: function() {
      // console.log(clc.cyan('   :::::   '), this);
      this.setDataValue('password', bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null));
    },
    get: function(password) {
      // return this.getDataValue('userName');
      return this;
      // return bcrypt.compareSync(password, this.password);
    } 
  },
  email: Sql.STRING,
},
{
  // paranoid: true,
  instanceMethods: {
    verifyPassword: function(password, userPassword) {
      return bcrypt.compareSync(password, userPassword);
    },
    generateToken: function(secret, callback) {
      return eat.encode({id: this.id}, secret, callback);
    },
    testFunc: function() {
      var hash = bcrypt.hashSync("bacon");
 
      bcrypt.compareSync("bacon", hash); // true
    }
    
  }

});

/*var user = User.build();
user.private_1 = 'test';*/

//User.sync({force: false});

User.sync({force: false})
.then(function() {
  console.log(clc.blue('::::::::     '), sql.databaseVersion());
})
/*.then(function () {
  return User.create({
  userName: 'TestUser',
  password: 'password',
  email: 'email@example.com'  
  });
})*/
.then(function() {
  console.log(clc.green('User created'));
  return User.findOne({
  where: {
    userName: 'TestUser'
  }
  })
  .then(function(user) {
    var pwComp = bcrypt.hashSync('password', bcrypt.genSaltSync(8), null);
    var pw =    user.$modelOptions.instanceMethods.verifyPassword('password', pwComp);
    var testF = user.$modelOptions.instanceMethods.testFunc;
    // var gh = user[0].dataValues.password;
    console.log(clc.yellow('   ::::::    '), pw);
    var realPw = bcrypt.hashSync('password');
    // console.log(user.$modelOptions.instanceMethods.verifyPassword("password", realPw)); // true
  })
})
    var hash = bcrypt.hashSync("bacon");