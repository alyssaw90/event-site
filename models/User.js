'use strict';

const bcrypt = require('bcrypt-nodejs');
const eat = require('eat');

module.exports = function(sql, DataTypes) {

  return sql.define('User', {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      set: function(val) {
        let outputString = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
        let randomNumber = Math.ceil(Math.random() * 10) + 10;
        for ( let i = 0; i < randomNumber; i++ ) {
          outputString += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        //set randomString to a random string
        this.setDataValue('randomString',  outputString);
        //hash the password
        this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(8), null));
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
      
    },
    hasTrigger: true,
    paranoid: true

  });

};
/*randomString: {
      type: DataTypes.STRING,
      set: function(val) {
        console.log(clc.bgRed.white(`::::::    `));
        let outputString = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<,>.?/';
        let randomNumber = Math.ceil(Math.random() * 10) + 10;
        for ( let i = 0; i < randomNumber; i++ ) {
          outputString += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this.setDataValue('randomString',  outputString)
      }
    },*/