'use strict';

const AdminCtrl = (app) => {
	app.controller('AdminCtrl', ['$rootScope', '$scope', '$http', 'Upload', 'adminRESTResource', function($rootScope, $scope, $http, Upload, resource) {
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
		$scope.newEvent = {};
		$scope.hideModal = true;
    $scope.hideEventPreview = true;

		let DataForEditingEvents = resource();

		$scope.getEvents = () => {

			DataForEditingEvents.getAllEvents(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve events'});
        };
        
        $scope.theEvents = data;
      })
			
		
		};

		$scope.getAllSpeakers = () => {

			DataForEditingEvents.getAllSpeakers(function(err, speakers) {
				if (err) {
					return $scope.errors.push({msg: 'could not retrieve speakers'});
				}

				$scope.theSpeakers = speakers;
			})
		};

		$scope.createNewEvent = (newEvent) => {
        newEvent.newEventHeaderImage = $rootScope.uploadedFile.name ? $rootScope.uploadedFile.size + '-' + $rootScope.uploadedFile.name : '';
        console.log('data:     ', newEvent, '      ', newEvent.newEventHeaderImage);
      DataForEditingEvents.createEvent(newEvent, function (err, data) {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
      });
    };

    $scope.closeModalWindow = () => {
    	$scope.hideModal = !$scope.hideModal;
    };

    $scope.toggleEventPreview = () => {
      $scope.hideEventPreview = !$scope.hideEventPreview;
    };

    $scope.getPreviewSpeakers = (theSpeakers) => {
      let keysArr = Object.keys(newEvent.speakers);
      // $scope.test = keysArr.indexOf(speakerId) > -1;
      console.log('array :::   ', keysArr, '   obj   ' , speakersObj);
      // return keysArr.indexOf(speakerId) > -1;
      return $scope.theSpeakers.filter(function (speaker) {
        return $scope.keysArr.indexOf(speaker.id) !== -1;
      });
    }


        // upload on file select or drop 
    /*$scope.uploadNewFile = (file) => {
      Upload.upload({
          url: 'multer',
          data: {file: file}
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
 		};*/

/* 		$scope.uploadNewFile = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    }*/

	}])
}

module.exports = AdminCtrl;