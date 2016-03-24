'use strict';

/* jshint shadow:true */
/*global $ */
/*global document */
/*global $ */
/*global stickyFooter */
/*global window */
/*global MutationObserver */
/* jshint loopfunc:true */
/*global alert*/
/*global Cookies*/

$(function() {
	var $email = $('#email');
	var $password = $('#password');
	var $loginButton = $('#loginButton');
	var $badLogInDiv = $('#badLogInDiv');

	//Submits an invalid authentication header, causing the user to be 'logged out'
	function logout() {
		Cookies.set('token', 'not a token');
    $.ajax({
      type: 'post',
      url: '/auth/login',
      dataType: 'json',
      async: true,
      username: 'not_a_real_username',
      password: 'not_a_real_password',
      data: '{ "comment" }'
    })
		//In our case, we WANT to get access denied, so a success would be a failure.
		.done(function(){
		    alert('Error logging off!');
		})
		//Likewise, a failure *usually* means we succeeded.
		//set window.location to redirect the user to wherever you want them to go
		.fail(function(){
		    window.location = '/thankyou';
  	});
	}

	$loginButton.click(function(e) {
		e.preventDefault();
		var $form = $('#loginForm');

		$.ajax({
			/*afterSend: function (xhr) {
        xhr.setRequestHeader('Authorization', ('Basic ' + btoa('xxxx')));
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      },*/
			method: 'post',
			url: '/auth/login',
			dataType: 'json',
      async: true,
      username: $email.val(),
      password: $password.val()

		})
		.done(function(data) {
			Cookies.set('token', data.token);
			window.location = '/curriculum';
		})
		.error(function(error) {
			console.log(error);
			// $badLogInDiv.show();
			alert('There was a problem with your log in, please try again');
		});
	});

	$('#testButton').click(function(e) {
		var ckie = Cookies.get('token');
		console.log('ladfjhlkadshf', Cookies.get('token'));
	});


	$('#logoutButton').click(logout);

});