'use strict';

const HeaderController = (app) => {
	app.controller('HeaderController', ['$scope', '$http', 'headerRESTResource', ($scope, $http, resource) => {
		$scope.errors = [];
		$scope.siteStyle = [];
		$scope.sliderImgsHeights = [];
		$scope.pastEventsImg = './uploads/past-events-banner.jpg';
		let Slideshow = resource();

		$scope.getSiteStyle = () => {

			Slideshow.getSiteStyle( (err, data) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve header events'});
        };
        
        $scope.siteStyles = data;
      })
			
		
		};

	}])
}

module.exports = HeaderController;