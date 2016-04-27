'use strict';

var clc = require('cli-color');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

module.exports = function(sql, DataTypes) {

  return sql.define('User', {
    userName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function(val) {
        console.log(clc.bgRed.white(`::::::    `));
        var outputString = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
        var randomNumber = Math.ceil(Math.random() * 10) + 10;
        for ( var i = 0; i < randomNumber; i++ ) {
          outputString += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        //set randomString to a random string
        this.setDataValue('randomString',  outputString)
        //hash the password
        this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(8), null))
      }
    },
    email: DataTypes.STRING,
    randomString: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
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

}
/*randomString: {
      type: DataTypes.STRING,
      set: function(val) {
        console.log(clc.bgRed.white(`::::::    `));
        var outputString = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
        var randomNumber = Math.ceil(Math.random() * 10) + 10;
        for ( var i = 0; i < randomNumber; i++ ) {
          outputString += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this.setDataValue('randomString',  outputString)
      }
    },*/