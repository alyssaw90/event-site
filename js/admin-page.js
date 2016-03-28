'use strict';

(function($) {
	$(function() {
		
			function submitForm(formId, submitUrl) {
  		  var fd = new FormData(document.getElementById(formId));
  		  fd.append('label', 'WEBUPLOAD');
  		  $.ajax({
  		    url: submitUrl,
  		    type: 'POST',
  		    data: fd,
  		    enctype: 'multipart/form-data',
  		    processData: false,  // tell jQuery not to process the data
  		    contentType: false   // tell jQuery not to set contentType
  		  })
  		  .done(function( data ) {
  		      // console.log('Node Output:');
  		      // console.log( data );
  		  });
			}

	});
})(jQuery);