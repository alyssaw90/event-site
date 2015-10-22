'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	$.get('/homepageteam', function (data) {
		var theHomepageTeam = '<h2>Meet the Team</h2>';
		// console.log('HELLO WORLD', data[0].divId);
		$(data).each(function (i, elem) {
			// console.log(elem.headShot);
			theHomepageTeam += '<div class="col_3 individual-homepage-expert"><a href="/meet-the-team#' + elem.divId + '"><img class="pull-left" title="' + elem.msTeamTitle + '" src="data:image;base64,' + elem.headShot + '" /><h6>' + elem.firstName + ' ' + elem.lastName + '</h6><p>' + elem.msTeamTitle + '</p></a></div>';
		});
		// console.log(theTeam);
		$('.home-page-experts').append(theHomepageTeam);
	});
});
