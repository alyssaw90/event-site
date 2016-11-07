'use strict';
const swal = require('sweetalert');

const AdminPageCtrl = (app) => {
	app.controller('AdminPageCtrl', ['$rootScope', '$scope', 'Upload', '$timeout', 'adminPageRESTResource', '$http', ($rootScope, $scope, Upload, $timeout, resource, $http) => {

    const AdminPageREST = resource();

    $scope.languageCodes = ['ab','aa','af','sq','am','ar','an','hy','as','ay','az','ba','eu','bn','dz','bh','bi','br','bg','my','be','km','ca','zh','ns','nt','co','hr','cs','da','nl','en','eo','et','fo','fa','fj','fi','fr','fy','gl','gd','gv','ka','de','el','kl','gn','gu','ht','ha','iw','hi','hu','is','io','in','ia','ie','iu','ik','ga','it','ja','jv','kn','ks','kk','rw','ky','rn','ko','ku','lo','la','lv','li','ln','lt','mk','mg','ms','ml','mt','mi','mr','mo','mn','na','ne','no','oc','or','om','ps','pl','pt','pa','qu','rm','ro','ru','sm','sg','sa','sr','sh','st','tn','sn','ii','sd','si','ss','sk','sl','so','es','su','sw','sv','tl','tg','ta','tt','te','th','bo','ti','to','ts','tr','tk','tw','ug','uk','ur','uz','vi','vo','wa','cy','wo','xh','ji','yo','zu',];

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
            swal({
              title: 'Error!',
              text: 'there was a problem saving your file',
              type: 'error',
              confirmButtonText: 'OK',
              customClass: 'sweet-alert-hide-input'
            });
        }, (evt) => {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            swal({
              title: 'Saved!',
              text: 'Your file was saved',
              type: 'success',
              confirmButtonText: 'OK',
              customClass: 'sweet-alert-hide-input'
            })
        });
      }   
    };

    function addTinymceFile(file) {
      AdminPageREST.addTinymceFile(file, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not upload file'});
          swal({
            title: 'Error!',
            text: 'there was a problem saving your file',
            type: 'error',
            confirmButtonText: 'OK',
            customClass: 'sweet-alert-hide-input'
          });
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
            console.log('result ::  ', e.target);
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