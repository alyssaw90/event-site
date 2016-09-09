'use strict';

module.exports = function(sql, DataTypes) {
	return sql.define('Slide', {
		imgSrcUrl: DataTypes.TEXT,
		imgDestUrl: DataTypes.TEXT,
		title: DataTypes.TEXT,
		altText: DataTypes.TEXT
	},
	{
		hasTrigger: true,
    paranoid: true
	})
}