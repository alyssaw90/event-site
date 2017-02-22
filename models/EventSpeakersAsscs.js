// Event speaker order model
// Stores the order of the team members on the meet the team page
'use strict';

module.exports = function(sql, DataTypes) {

	return sql.define('EventSpeakersAsscs', {
		sortPosition: DataTypes.INTEGER
	},
	{
		hasTrigger: true
	});
	
};