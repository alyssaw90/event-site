'use strict';
const swal = require('sweetalert');

const AdminPageCtrl = (app) => {
	app.controller('AdminPageCtrl', ['$rootScope', '$scope', 'Upload', '$timeout', 'adminPageRESTResource', '$http', ($rootScope, $scope, Upload, $timeout, resource, $http) => {

    const AdminPageREST = resource();

    $scope.languageCodes = {en: `English`, zh: `Chinese`, ns: `Chinese (Simplified)	zh-H`, nt: `Chinese (Traditional)	zh-H`, ab: `Abkhazian`, aa: `Afar`, af: `Afrikaans`, sq: `Albanian`, am: `Amharic`, ar: `Arabic`, an: `Aragonese`, hy: `Armenian`, as: `Assamese`, ay: `Aymara`, az: `Azerbaijani`, ba: `Bashkir`, eu: `Basque`, bn: `Bengali (Bangla)`, dz: `Bhutani`, bh: `Bihari`, bi: `Bislama`, br: `Breton`, bg: `Bulgarian`, my: `Burmese`, be: `Byelorussian (Belarusian)`, km: `Cambodian`, ca: `Catalan`, co: `Corsican`, hr: `Croatian`, cs: `Czech`, da: `Danish`, nl: `Dutch`, eo: `Esperanto`, et: `Estonian`, fo: `Faeroese`, fa: `Farsi`, fj: `Fiji`, fi: `Finnish`, fr: `French`, fy: `Frisian`, gl: `Galician`, gd: `Gaelic (Scottish)`, gv: `Gaelic (Manx)`, ka: `Georgian`, de: `German`, el: `Greek`, kl: `Greenlandic`, gn: `Guarani`, gu: `Gujarati`, ht: `Haitian Creole`, ha: `Hausa`, iw: `Hebrew	he,`, hi: `Hindi`, hu: `Hungarian`, is: `Icelandic`, io: `Ido`, in: `Indonesian	id,`, ia: `Interlingua`, ie: `Interlingue`, iu: `Inuktitut`, ik: `Inupiak`, ga: `Irish`, it: `Italian`, ja: `Japanese`, jv: `Javanese`, kn: `Kannada`, ks: `Kashmiri`, kk: `Kazakh`, rw: `Kinyarwanda (Ruanda)`, ky: `Kirghiz`, rn: `Kirundi (Rundi)`, ko: `Korean`, ku: `Kurdish`, lo: `Laothian`, la: `Latin`, lv: `Latvian (Lettish)`, li: `Limburgish ( Limburger)`, ln: `Lingala`, lt: `Lithuanian`, mk: `Macedonian`, mg: `Malagasy`, ms: `Malay`, ml: `Malayalam`, mt: `Maltese`, mi: `Maori`, mr: `Marathi`, mo: `Moldavian`, mn: `Mongolian`, na: `Nauru`, ne: `Nepali`, no: `Norwegian`, oc: `Occitan`, or: `Oriya`, om: `Oromo (Afaan Oromo)`, ps: `Pashto (Pushto)`, pl: `Polish`, pt: `Portuguese`, pa: `Punjabi`, qu: `Quechua`, rm: `Rhaeto-Romance`, ro: `Romanian`, ru: `Russian`, sm: `Samoan`, sg: `Sangro`, sa: `Sanskrit`, sr: `Serbian`, sh: `Serbo-Croatian`, st: `Sesotho`, tn: `Setswana`, sn: `Shona`, ii: `Sichuan Yi`, sd: `Sindhi`, si: `Sinhalese`, ss: `Siswati`, sk: `Slovak`, sl: `Slovenian`, so: `Somali`, es: `Spanish`, su: `Sundanese`, sw: `Swahili (Kiswahili)`, sv: `Swedish`, tl: `Tagalog`, tg: `Tajik`, ta: `Tamil`, tt: `Tatar`, te: `Telugu`, th: `Thai`, bo: `Tibetan`, ti: `Tigrinya`, to: `Tonga`, ts: `Tsonga`, tr: `Turkish`, tk: `Turkmen`, tw: `Twi`, ug: `Uighur`, uk: `Ukrainian`, ur: `Urdu`, uz: `Uzbek`, vi: `Vietnamese`, vo: `Volapük`, wa: `Wallon`, cy: `Welsh`, wo: `Wolof`, xh: `Xhosa`, ji: `Yiddish	yi,`, yo: `Yoruba`, zu: `Zulu`};

    $rootScope.uploadFiles = (file, errFiles, rootScopeKey, callback) => {
      $rootScope[rootScopeKey] = file;
      $rootScope.errFile = errFiles && errFiles[0];
      if (file) {
        // Upload.rename(file, 'AAAAA.jpg');
        file.upload = Upload.upload({
          url: '../admin/multer',
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
          // console.log(`File Location :::: `, fileLocation);
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
  
    $rootScope.tinymceOptions = { 
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
      image_list: '/admin/showimages',
      image_advtab: true,
      content_css: [
        '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    };

	}])
}

module.exports = AdminPageCtrl;