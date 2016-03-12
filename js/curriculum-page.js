'use strict';

$(function() {
	var $email = $('#email');
	var $password = $('#password');
	var $loginButton = $('#loginButton');

	$loginButton.click(function(e) {
		e.preventDefault();
		var $form = $('#loginForm');
		// console.log($form);
		var loginInfo = JSON.stringify({email: $email.val(), password: $password.val()});
		var testInfo = JSON.stringify({email: 'test@example.com', password: '123'});
	// console.log($email.val(), '      ', $password.val(), '       :  ', testInfo);
		/*$.get('/auth/login', testInfo, function(data) {
			console.log(data);
		})*/
		$.ajax({
			method: 'get',
			url: '/auth/login',
			// data: testInfo

		})
		.done(function(data) {
			Cookies.set('token', data);
			var tkn = Cookies.get('token');
			console.log('hola               ', tkn);
		})
		.error(function(error) {
			console.log(error);
		})
	})

	$('#testButton').click(function(e) {
		e.preventDefault();
		var ckie = Cookies.get('token');
		console.log('cooookieee     ', ckie);
	})

})