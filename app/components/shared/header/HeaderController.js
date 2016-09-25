'use strict';

const HeaderController = (app) => {
	app.controller('HeaderController', ['$scope', '$http', 'headerRESTResource', ($scope, $http, resource) => {
		$scope.errors = [];
		$scope.siteStyle = [];
		$scope.sliderImgsHeights = [];
		$scope.pastEventsImg = './uploads/past-events-banner.jpg';
		let Slideshow = resource();

		$scope.getSlides = (slideshowName) => {

			Slideshow.getSlides(slideshowName, (err, data) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve slideshow images'});
        };
        
        $scope.slides = data;
        for (let i = 0, len = $scope.slides.length; i < len; i++) {
        	$scope.slides[i].imgSrcUrl = 'uploads/' + $scope.slides[i].imgSrcUrl;
        }
      })
			
		
		};

	}])
}

module.exports = HeaderController;