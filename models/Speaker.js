// Speaker and team member model

'use strict';

module.exports = function (sql, DataTypes) {

  return sql.define('Speaker', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      // unique: true,
      validate: {
        isEmail: true
      }
    },
    isPublished: DataTypes.BOOLEAN,
    lastModifiedBy: DataTypes.STRING,
    newsletterSubscription: DataTypes.BOOLEAN,
    speakerDescription: DataTypes.TEXT,
    showOnMeetTheTeamPage: DataTypes.BOOLEAN,
    meetTheTeamPageOrder: DataTypes.INTEGER,
    msTeamTitle: DataTypes.STRING,
    showOnHomePage: DataTypes.BOOLEAN,
    headShot: DataTypes.TEXT,
    company: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    interestId: DataTypes.INTEGER,
    allowNotifications: DataTypes.BOOLEAN,
    allowPersonalInfoSharing: DataTypes.BOOLEAN
  },
  {
    getterMethods: {
      divId: function () {
        let theDate = new Date();
        if (!this.firstName && !this.lastName) {
          this.firstName = '';
        }
        if (!this.lastName) {
          this.lastName = '';
        }
        return this.firstName.toLowerCase() + '-' + this.lastName.toLowerCase() + '-' + Date.parse(theDate);
      },
      fullName: function () {
        return this.firstName + ' ' + this.lastName;
      }
    },

    setterMethods: {
      /*fullName: function(value) {
        console.log(  'VALUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  ', value);
          let names = value.split('-');
          this.setDataValue('firstName', names.slice(0, -1).join(' '));
          this.setDataValue('lastName', names.slice(-1).join(' '));
      }*/
    },
    hasTrigger: true,
    paranoid: true
  });
};
