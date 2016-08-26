// 'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(sql, DataTypes) {
  
  return sql.define('EventTab', {
    // eventId: DataTypes.INTEGER,
    tabNumber: DataTypes.INTEGER,
    tabTitle: DataTypes.TEXT,
    tabContent: DataTypes.TEXT
  },
  {
  	hasTrigger: true,
    paranoid: true
  });
  
};
