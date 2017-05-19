// Microsoft user model
// Determines if user is and admin or not
// Will not need this model after login flow is redone.
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