'use strict';

const AdminPageCtrl = (app) => {
	app.controller('AdminPageCtrl', ['$rootScope', '$scope', 'Upload', '$timeout', 'adminPageRESTResource', '$http', ($rootScope, $scope, Upload, $timeout, resource, $http) => {

    const AdminPageREST = resource();
    let bingKey;


    function getBingKey() {
      AdminPageREST.getBingKey( (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not retrieve Bing API key'});
        }
        if (!err) {
          return data;
        }
      })
    }
    bingKey = getBingKey();

    function getCityNames(cityName) {
      AdminPageREST.getCityNames(cityName, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not find location'});
        }
        if (!err) {
          console.log('cities :: ', data.resourceSets[0].resources);
        }
      })
    }
    getCityNames('Seattle');

    $rootScope.uploadFiles = (file, errFiles, rootScopeKey, callback) => {
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

    function addTinymceFile(file) {
      AdminPageREST.addTinymceFile(file, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not upload file'});
          alert('there was a problem sving your file');
        }
        if (!err) {
          return;
        }

      });
    };

    function pickFile(callback, value, meta) {
        const $uploadInput = jQuery('#upload');
        $uploadInput.trigger('click');
        $uploadInput.on('change', function() {
          let file = this.files[0];
          let reader = new FileReader();
          let time = new Date().valueOf();
          let fileName =  `${time}-${file.name}`;
          let fileLocation = `/uploads/${fileName}`;
          reader.onloadend = (e) => {
            let base64String = e.target.result.split(',')[1];
            addTinymceFile({
              base64String: base64String,
              fileName: fileName,
            });

            // Provide file and text for the link dialog
            if (meta.filetype === 'file') {
              callback(fileLocation, { text: fileName, target: '_self' } );
            }

            // Provide image and alt text for the image dialog
            if (meta.filetype === 'image') {
              callback(fileLocation);
            }

            // Provide alternative source and posted for the media dialog
            if (meta.filetype === 'media') {
              callback(fileLocation);
            }
          };

          reader.readAsDataURL(file);
        })
        return false;
      }
  
    $scope.tinymceOptions = { 
      selector: 'textarea',
      height: 500,
      theme: 'modern',
      automatic_uploads: true,
      file_picker_types: 'image file media',
      file_picker_callback : pickFile,
      plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools',
      'textcolor colorpicker'
      ],
      paste_data_images: true,
      inline: false,
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image | spellchecker',
      image_list: '/api/showimages',
      image_advtab: true,
      content_css: [
        '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    };

	}])
}

module.exports = AdminPageCtrl;