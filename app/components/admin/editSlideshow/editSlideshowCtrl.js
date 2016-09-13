'use strict';

const editSlideshowCtrl = (app) => {
	app.controller('editSlideshowCtrl', ['editSlideshowRESTResource', '$scope', (resource, $scope) => {
		$scope.compareArr = [];
		$scope.errors = [];
		$scope.slides = [];
		let SlideshowData = resource();
		//function to retrieve all slides
		const getAllSlides = () => {
			SlideshowData.getAllSlides( (err, data) => {
				if (err) {
					return $scope.errors.push({msg: 'could not retrieve slides'});
				}
				for (let i = 0, j = data.length; i < j; i++) {
					if ($scope.compareArr.indexOf(data[i].id) < 0) {
						$scope.slides.push(data[i]);
					}
				}

				for (let i = 0, len = $scope.slides.length; i < len; i++) {
					$scope.slides[i].imgSrcUrl = '/uploads/' + $scope.slides[i].imgSrcUrl;
				}

			})
		}
		
		$scope.sortableOptions = {
  	  placeholder: 'slideshowSlide',
  	  connectWith: '.slide-table-container'
  	};
  	//function to get all slides currently displayed in slideshow
		$scope.getAllSlideshows = (slideshowName) => {
			SlideshowData.getAllSlideshows(slideshowName, (err, data) => {
				if (err) {
					return $scope.errors.push({msg: 'could not retrieve slideshows'});
				}

				$scope.slideshowSlides = data;
				for (let i = 0, len = $scope.slideshowSlides.length; i < len; i++) {
					$scope.compareArr.push($scope.slideshowSlides[i].id);
					$scope.slideshowSlides[i].imgSrcUrl = '/uploads/' + $scope.slideshowSlides[i].imgSrcUrl;
				}
				//call getAllSlides after slideshowSlides array has been created
				getAllSlides();
			})
		}


		$scope.setNewSlideshowOrder = () => {
			SlideshowData.setNewSlideshowOrder($scope.slideshowSlides, (err, data) => {
				if (err) {
					return $scope.errors.push({msg: 'could not edit slideshow'});
				}
				alert('new slideshow saved');
			})
		}

	}])
}

module.exports = editSlideshowCtrl;