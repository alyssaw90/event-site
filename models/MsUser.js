'use strict';

module.exports = function(sql, DataTypes) {
	return sql.define(`MsUser`, {
		email: {
			type: DataTypes.STRING,
			required: true
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			required: true
		}
	},
	{
		hasTrigger: true,
		paranoid: true
	});
};