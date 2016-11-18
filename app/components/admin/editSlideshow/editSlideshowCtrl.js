'use strict';
const jQuery = require('jquery');
const swal = require('sweetalert');

const editSlideshowCtrl = (app) => {
	app.controller('editSlideshowCtrl', ['editSlideshowRESTResource', '$scope', '$rootScope', '$window', '$timeout', (resource, $scope, $rootScope, $window, $timeout) => {
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
				//empty the completeListOfSlides array
				$scope.completeListOfSlides = [];
				$scope.slides = [];
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
  	  connectWith: '.slide-sort-section'
  	};
  	//function to get all slides currently displayed in slideshow
		$scope.getAllSlideshows = (slideshowName) => {
			SlideshowData.getAllSlideshows(slideshowName, (err, data) => {
				if (err) {
					return $scope.errors.push({msg: 'could not retrieve slideshows'});
				}
				$scope.compareArr = [];
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
				swal({
					title: 'new slideshow published',
					type: 'success',
					customClass: 'sweet-alert-hide-input'
				});
			})
		}

		$scope.cancelAddSlide = () => {
			$scope.newSlide = {};
		}

		$scope.addSlide = (slideData) => {
			if ($rootScope.newSlideImage) {
        slideData.imgSrcUrl = $rootScope.newSlideImage.name ? $rootScope.newSlideImage.size + '-' + $rootScope.newSlideImage.name : '';
      }

			SlideshowData.addSlide(slideData, (err, data) => {
				if (err) {
					swal({
						title: 'could not edit slideshow',
						type: 'error',
					 	customClass: 'sweet-alert-hide-input'
					});
					return;
				}
				swal({
						title: 'New slide published',
						type: 'success',
					 	customClass: 'sweet-alert-hide-input'
					});
				let theNewSlide = JSON.parse(JSON.stringify($scope.newSlide));
				$scope.completeListOfSlides.push(theNewSlide);
				//empty slides array
				// $scope.slides.length = 0;
				$scope.newSlide = {};
				getAllSlides();
				$timeout( () => {
					jQuery('#newSlideModal').trigger('click');
				});
			})
		}

		$scope.deleteSlide = (slideIds) => {
			swal({
					  title: 'Permanently delete slide(s)?',
					  text: 'This CANNOT be undone',
					  type: 'warning',
					  showCancelButton: true,
					  confirmButtonColor: '#DD6B55',
					  confirmButtonText: 'Delete',
					  cancelButtonText: 'Cancel!',
					  closeOnConfirm: false,
					  closeOnCancel: false,
				  	customClass: 'sweet-alert-hide-input'
					},
					function(isConfirm){
						let slidesToDelete = [];
					  if (isConfirm) {
					  	for (let key in slideIds) {
					      if (slideIds[key]) {
					        slidesToDelete.push(key)
					      }
					    }
							SlideshowData.deleteSlide(slidesToDelete, (err, data) => {
								if (err) {
									return $scope.errors.push({msg: 'could not delete slides'});
								}
								swal({
									title: 'slide(s) deleted',
									type: 'success',
									customClass: 'sweet-alert-hide-input'
								});
								
								$scope.deleteSlideForm.$setPristine();
								//empty slides array
								$scope.slidesToDelete.length = 0;
								$scope.slides.length = 0;
								getAllSlides();
								$timeout( () => {
									jQuery('#deleteSlideModalButton').trigger('click');
								});
							})
						
					    swal({
					    	type: 'success',
					    	title: 'Deleted!',
					    	customClass: 'sweet-alert-hide-input'
					    });
					  } else {
					    swal({
					    	title: 'Canceled',
					    	type: 'error',
					    	customClass: 'sweet-alert-hide-input'
					    });
					  }
					});
		}

		$scope.cleanDeleteForm = () => {

				$scope.slidesToDelete.length = 0;
				$scope.slidesToDelete = {};
		}

	}])
}

module.exports = editSlideshowCtrl;