// 'use strict';

module.exports = function(sql, DataTypes) {
  
  return sql.define('EventTab', {
    // eventId: DataTypes.INTEGER,
    tabNumber: DataTypes.INTEGER,
    tabTitle: DataTypes.TEXT,
    tabContent: DataTypes.TEXT,
    isPublished: DataTypes.BOOLEAN
  },
  {
  	hasTrigger: true,
    paranoid: true
  });
  
};
