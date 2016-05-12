'use strict';

module.exports = function(sql, DataTypes) {

	return sql.define('SiteStyle', {
		showSlider: DataTypes.BOOLEAN
	})
	
}