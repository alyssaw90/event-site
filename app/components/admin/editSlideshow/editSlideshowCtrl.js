'use strict';
const jQuery = require('jquery');

const editSlideshowCtrl = (app) => {
	app.controller('editSlideshowCtrl', ['editSlideshowRESTResource', '$scope', '$rootScope', '$window', (resource, $scope, $rootScope, $window) => {
		$scope.compareArr = [];
		$scope.errors = [];
		$scope.slides = [];
		$scope.completeListOfSlides = [];
		$scope.newSlideName;
		$scope.newSlide = {};
		$scope.slidesToDelete = {};
		let SlideshowData = resource();

		//function to retrieve all slides
		const getAllSlides = () => {
			SlideshowData.getAllSlides( (err, data) => {
				if (err) {
					return $scope.errors.push({msg: 'could not retrieve slides'});
				}
				$scope.completeListOfSlides = data;
				for (let i = 0, j = data.length; i < j; i++) {
					if ($scope.compareArr.indexOf(data[i].id) < 0) {
						$scope.slides.push(data[i]);
					}
				}
				for (let i = 0, len = $scope.slides.length; i < len; i++) {
					$scope.slides[i].imgSrcUrl = '/uploads/' + $scope.slides[i].imgSrcUrl;
				}
				for (let i = 0, len = $scope.completeListOfSlides.length; i < len; i++) {
					if ($scope.completeListOfSlides[i].imgSrcUrl.substr(0, 9) !== '/uploads/') {
						$scope.completeListOfSlides[i].imgSrcUrl = '/uploads/' + $scope.completeListOfSlides[i].imgSrcUrl;						
					}
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

		$scope.addSlide = (slideData) => {
			if ($rootScope.newSlideImage.name) {
        slideData.imgSrcUrl = $rootScope.newSlideImage.name ? $rootScope.newSlideImage.size + '-' + $rootScope.newSlideImage.name : '';
      }

			SlideshowData.addSlide(slideData, (err, data) => {
				if (err) {
					return $scope.errors.push({msg: 'could not edit slideshow'});
				}
				alert('new slide saved');
				jQuery('#newSlideModal').trigger('click');
				//empty slides array
				$scope.slides.length = 0;
				$scope.newSlide = {};
				getAllSlides();
			})
		}

		$scope.deleteSlide = (slideIds) => {
			let testQuestion = $window.confirm('Permanently delete slide(s)?');
			if (testQuestion) {
				SlideshowData.deleteSlide(slideIds, (err, data) => {
					if (err) {
						return $scope.errors.push({msg: 'could not delete slides'});
					}
					alert('slide(s) deleted');
					jQuery('#deleteSlideModalButton').trigger('click');
					$scope.deleteSlideForm.$setPristine();
					//empty slides array
					$scope.slidesToDelete.length = 0;
					$scope.slides.length = 0;
					getAllSlides();
				})
			}
		}

		$scope.cleanDeleteForm = () => {

				$scope.slidesToDelete.length = 0;
				$scope.slidesToDelete = {};
		}

	}])
}

module.exports = editSlideshowCtrl;