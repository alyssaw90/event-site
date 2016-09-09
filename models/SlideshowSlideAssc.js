'use strict';

module.exports = function(sql, DataTypes) {

	return sql.define('SlideshowSlideAssc', {
		sortPosition: DataTypes.INTEGER
	},
	{
		hasTrigger: true,
    paranoid: true
	});
	
};