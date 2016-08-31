'use strict';

const HeaderController = (app) => {
	app.controller('HeaderController', ['$scope', '$http', 'headerRESTResource', ($scope, $http, resource) => {
		$scope.errors = [];
		$scope.siteStyle = [];
		$scope.sliderImgsHeights = [];

		let SiteStyle = resource();

		$scope.getSiteStyle = () => {

			SiteStyle.getSiteStyle( (err, data) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve header events'});
        };
        
        $scope.siteStyles = data;
      })
			
		
		};

	}])
}

module.exports = HeaderController;