'use strict';

module.exports = function(sql, DataTypes) {

	return sql.define('EventSpeakersAsscs', {
		sortPosition: DataTypes.INTEGER
	},
	{
		hasTrigger: true
	});
	
};