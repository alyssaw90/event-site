'use strict';

const AdminFileUploadCtrl = (app) => {
	app.controller('AdminFileUploadCtrl', ['$rootScope', '$scope', 'Upload', '$timeout', function($rootScope, $scope, Upload, $timeout) {

    $scope.uploadFiles = (file, errFiles) => {
      $rootScope.uploadedFile = file;
      $rootScope.errFile = errFiles && errFiles[0];
      if (file) {
        // Upload.rename(file, 'AAAAA.jpg');
        file.upload = Upload.upload({
          url: '../multer',
          headers: {
            'enctype': 'multipart/form-data'
          },
          data: {
            file: file,
            fileFormDataName: 'photo',
            // name: new Date().getTime() + '-' + Upload.rename(file, 'AAAAA.jpg')
          }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $rootScope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }   
    };

	}])
}

module.exports = AdminFileUploadCtrl;