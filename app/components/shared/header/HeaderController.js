'use strict';

const HeaderController = (app) => {
	app.controller('HeaderController', ['$scope', '$http', 'headerRESTResource', function($scope, $http, resource) {
		$scope.errors = [];
		$scope.siteStyle = [];

		let SiteStyle = resource();

		$scope.getSiteStyle = () => {

			SiteStyle.getSiteStyle(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve team members'});
        };
        
        $scope.siteStyles = data;
      })
			
		
		}
	}])
}

module.exports = HeaderController;