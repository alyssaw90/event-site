'use strict';

let fs = require('fs');
let path = require('path');

module.exports = function(sql, DataTypes) {
  
  return sql.define('EventTab', {
    eventId: DataTypes.INTEGER,
    tabNumber: DataTypes.INTEGER,
    tabTitle: DataTypes.TEXT,
    tabContent: DataTypes.TEXT
  })
  
}
