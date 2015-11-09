'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	$.get('/showfullteam', function (data) {
		var theTeam = '';
		// console.log('HELLO WORLD', data[0].divId);
		$(data).each(function (i, elem) {
			var image = $.base64.decode(elem.headShot);
			console.log(elem.headShot);
			theTeam += '<section class="col_12" id="' + elem.divId + '"><h4>' + elem.firstName + ' ' + elem.lastName + '</h4><h5>'+ elem.msTeamTitle + '</h5><p><img class="pull-left" src="../uploads/' + elem.headShot + '" />' + elem.contactDescription + '</p><hr class="alt1" /></section>';
		});
		// console.log(theTeam);
		$('main').prepend(theTeam);
	});
});
