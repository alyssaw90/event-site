'use strict';

$(function() {
	var $email = $('#email');
	var $password = $('#password');
	var $loginButton = $('#loginButton');

	$loginButton.click(function(e) {
		e.preventDefault();
		var $form = $('#loginForm');
		var loginInfo = JSON.stringify({email: $email.val(), password: $password.val()});
		var testInfo = JSON.stringify({email: 'test@example.com', password: '123'});

		$.ajax({
			method: 'post',
			url: '/auth/login',
			data: loginInfo

		})
		.done(function(data) {
			console.log('done reached');
			Cookies.set('token', data.token);
			var tkn = Cookies.get('token');
			console.log('hola               ', data);
		})
		.error(function(error) {
		console.log('error reached');
			console.log(error);
		})
	})

	$('#testButton').click(function(e) {
		var ckie = Cookies.get('token');
		console.log(ckie);
			Cookies.set('token', 'not a token');
			console.log('ladfjhlkadshf', Cookies.get('token'));
/*		e.preventDefault();
		// var ckie = Cookies.get('token');
		// console.log('cooookieee     ', ckie);
		$.ajax({
      type: 'get',
      url: '/auth/logout'
      // data: {email: 'notemail@example.com', password: '789'},
      // headers: { 'Authorization': 'Basic xxx' }
		})
		.done(function(data){
		    // If we don't get an error, we actually got an error as we expect an 401!
	    // window.location = '/';
	    console.log(data);
		})
		.error(function(error){
	    // We expect to get an 401 Unauthorized error! In this case we are successfully 
            // logged out and we redirect the user.
	    // Cookies.set('Authorization', 'Basic xxx');
    });*/
 
    // return false;
	})

})