'use strict';

const jQuery = require('jquery');

const createEventDirective = (app) => {
	app.directive('createEventDirective', ['$timeout', function($timeout) {
		const createEventDirectiveObj = {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				$timeout(function() {

					const $firstTab = jQuery('#previewEventUl').find('li:first-child');
					const $lastTab = jQuery('#previewEventUl').find('li:last-child');
					$firstTab.addClass('first').addClass('current');
					$lastTab.addClass('last');
			    tinymce.init({
		    	  selector: 'textarea',
		    	  height: 500,
		    	  theme: 'modern',
		    	  plugins: [
		    	  'advlist autolink lists link image charmap print preview hr anchor pagebreak',
		    	  'searchreplace wordcount visualblocks visualchars code fullscreen',
		    	  'insertdatetime media nonbreaking save table contextmenu directionality',
		    	  'emoticons template paste textcolor colorpicker textpattern imagetools',
		    	  ],
		    	  paste_data_images: true,
		    	  inline: false,
		    	  toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		    	  content_css: [
		    	    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
		    	    '//www.tinymce.com/css/codepen.min.css'
		    	  ]
		    	});
					
				
				}, 1000);

				/*scope.tinymceOptions = {
				  setup: function(editor) {
				      //Focus the editor on load
				      // $timeout(function(){ editor.focus(); });
				      editor.on('init', function() {
				        
				      });
				      editor.on('click', function() {
				       
				      });
				  }
				};*/
				/*$timeout(function() {
					
				}, 500)*/


			}
			
		}

		return createEventDirectiveObj;
	}])
}

module.exports = createEventDirective;