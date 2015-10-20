'use strict';

$(document).ready(function () {
	$.get('/api/showfullteam', function (data) {
		var theTeam = '';
		// console.log('HELLO WORLD', data[0].divId);
		$(data).each(function (i, elem) {
			// console.log(elem.headShot);
			theTeam += '<section class="col_12" id="' + elem.divId + '"><h4>' + elem.firstName + ' ' + elem.lastName + '</h4><h5>'+ elem.msTeamTitle + '</h5><p><img class="pull-left" src="../../img/' + elem.headShot + '" />' + elem.contactDescription + '</p><hr class="alt1" /></section>';
		})
		// console.log(theTeam);
		$('main').prepend(theTeam);
	})
})
