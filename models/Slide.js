// // Slide model
// // Stores uploaded slides for slideshows
// 'use strict';

// module.exports = function(sql, DataTypes) {
// 	return sql.define('Slide', {
// 		imgSrcUrl: DataTypes.TEXT,
// 		imgDestUrl: DataTypes.TEXT,
// 		title: {
// 			type: DataTypes.TEXT,
// 			required: true
// 		},
// 		altText: {
// 			type: DataTypes.TEXT,
// 			required: true
// 		}
// 	},
// 	{
// 		hasTrigger: true,
//     paranoid: true
// 	});
// };