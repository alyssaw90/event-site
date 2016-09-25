'use strict';

const AdminFileUploadCtrl = (app) => {
	app.controller('AdminFileUploadCtrl', ['$rootScope', '$scope', 'Upload', '$timeout', ($rootScope, $scope, Upload, $timeout) => {

    $scope.uploadFiles = (file, errFiles, rootScopeKey, callback) => {
      $rootScope[rootScopeKey] = file;
      $rootScope.errFile = errFiles && errFiles[0];
      if (file) {
        // Upload.rename(file, 'AAAAA.jpg');
        file.upload = Upload.upload({
          url: '../api/multer',
          headers: {
            'enctype': 'multipart/form-data'
          },
          data: {
            file: file,
            fileFormDataName: 'photo',
            // name: new Date().getTime() + '-' + Upload.rename(file, 'AAAAA.jpg')
          }
        });

        file.upload.then( (response) => {
            $timeout( () => {
              file.result = response.data;
              if (callback) {
                callback();
              }
            });
        }, (response) => {
            if (response.status > 0)
              $rootScope.errorMsg = response.status + ': ' + response.data;
        }, (evt) => {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }   
    };

	}])
}

module.exports = AdminFileUploadCtrl;