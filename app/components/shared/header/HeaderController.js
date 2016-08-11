'use strict';

const HeaderController = (app) => {
	app.controller('HeaderController', ['$scope', '$http', 'headerRESTResource', function($scope, $http, resource) {
		$scope.errors = [];
		$scope.siteStyle = [];
		$scope.sliderImgsHeights = [];

		let SiteStyle = resource();

		$scope.getSiteStyle = () => {

			SiteStyle.getSiteStyle(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve team members'});
        };
        
        $scope.siteStyles = data;
      })
			
		
		};

		$scope.getHeight = (e) => {
			console.log('eeeee        ', e);
			return {minHeight: (window.innerHeight * 0.6) /*angular.element('div.layer')[0].height()*/ + 'px'};
		}
	}])
}

module.exports = HeaderController;