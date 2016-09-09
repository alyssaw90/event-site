'use strict';

const editSlideshowCtrl = (app) => {
	app.controller('editSlideshowCtrl', ['editSlideshowRESTResource', '$scope', (resource, $scope) => {
		$scope.errors = [];
		let SlideshowData = resource();
		console.log('slideshow::    ', resource());
		
		$scope.getAllSlideshows = (slideshowName) => {
			SlideshowData.getAllSlideshows(slideshowName, (err, data) => {
				if (err) {
					return $scope.errors.push({msg: 'could not retrieve slideshows'});
				}

				$scope.slides = data;
			})
		}
	}])
}

module.exports = editSlideshowCtrl;