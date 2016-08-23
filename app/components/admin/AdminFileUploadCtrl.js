'use strict';

const AdminFileUploadCtrl = (app) => {
	app.controller('AdminFileUploadCtrl', ['$scope', '$http', 'Upload', '$timeout', 'adminRESTResource', function($scope, $http, Upload, $timeout, resource) {
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
		$scope.newEvent = {};
		$scope.hideModal = true;

		let DataForEditingEvents = resource();

		/*$scope.getEvents = () => {

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

      DataForEditingEvents.createEvent(newEvent, function (err, data) {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
        console.log('data:     ', data);
      });
    };*/

    /*$scope.closeModalWindow = () => {
    	$scope.hideModal = !$scope.hideModal;
    }*/

        // upload on file select or drop 
    $scope.uploadNewFile = (file) => {
      console.log('file upload function called');
      Upload.upload({
          url: '../multer',
          data: {file: file}
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
 		};
/*
 		$scope.uploadNewFile = function(file, errFiles) {
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

    $scope.uploadFiles = (file, errFiles) => {
        $scope.uploadedFile = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '../multer',
                headers: {
                  'enctype': 'multipart/form-data'
                },
                data: {
                  file: file,
                  fileFormDataName: 'photo'
                }
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
    };

	}])
}

module.exports = AdminFileUploadCtrl;