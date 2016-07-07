'use strict';

module.exports = function(sql, DataTypes) {

	return sql.define('SiteStyle', {
		showSlider: DataTypes.BOOLEAN,
		showPastEventsBanner: DataTypes.BOOLEAN,
		hideEventBanners: DataTypes.BOOLEAN
	},
	{
		hasTrigger: true,
    paranoid: true
	});
	
};