//REMOVE ENTIRE FILE

// 'use strict';

// const BingMapCtrl = (app) => {
// 	app.controller('BingMapCtrl', ['$scope', '$http', 'bingMapRESTResource', function($scope, $http, resource) {
// 		$scope.errors = [];
// 		$scope.mapEvents = [];
// 		$scope.bingMapKey;

// 		let BingMapData = resource();

// 		const getBingMapKey = () => {

// 			BingMapData.getBingMapKey(function (err, data) {
//         if (err) {
//           return $scope.errors.push({msg: 'could not retrieve map key'});
//         };
//         $scope.bingMapKey = data;
        
//       })
			
		
// 		};

// 		const getMapEvents = () => {

// 			BingMapData.getMapEvents(function(err, data) {
// 				if (err) {
// 					return $scope.errors.push({msg: 'could not get bing map search results'});
// 				}

// 				$scope.mapEvents = data;
// 			})
// 		}

// 		$scope.addPushpins = (searchUrl) => {

// 			BingMapData.addPushpins(searchUrl, function(err, data) {
// 				if (err) {
// 					return $scope.errors.push({msg: 'could not get bing map search results'});
// 				}

// 			});
// 		}

// 		getBingMapKey();
// 		getMapEvents();

// 	}])
// }

// module.exports = BingMapCtrl;