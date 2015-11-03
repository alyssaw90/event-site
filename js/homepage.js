'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	$.get('/homepageteam', function (homepageTeam) {
		var theHomepageTeam = '<h2>Meet the Team</h2>';
		for (var i = 0, j = homepageTeam.length; i < j; i++) {
			theHomepageTeam += '<div class="col_3 individual-homepage-expert"><a href="/meet-the-team#' + homepageTeam[i].divId + '"><img class="pull-left" title="' + homepageTeam[i].msTeamTitle + '" src="data:image;base64,' + homepageTeam[i].headShot + '" /><h6>' + homepageTeam[i].firstName + ' ' + homepageTeam[i].lastName + '</h6><p>' + homepageTeam[i].msTeamTitle + '</p></a></div>';
		}
		// theHomepageTeam += '<hr class="alt1" />';
		$('#homepage-team').prepend(theHomepageTeam + '<hr class="alt1" />');
	});

/*	$.get('/events', function (homepageEvents) {
		var theHomepageSlider = '';
		var slideOne = '';
		var slideTwo = '';
		for (var i = 0, j = homepageEvents.length; i < j; i++) {
			theHomepageSlider += '<li><a href="/' + homepageEvents[i].eventUrl + '"><h2 class="desc"><span class="slide-title">'+ homepageEvents[i].eventName + '</span><br /><br /><span class="sub-title slideshow-city">' + homepageEvents[i].eventLocation + '</span><span class="sub-title slideshow-date">' + homepageEvents[i].eventStartDate + '</span><br /><br /><span class="sub-title"><i class="fa fa-code"></i>'+ homepageEvents[i].homepageBulletOne + '</span><br /><span class="sub-title"><i class="fa fa-code"></i>' + homepageEvents[i].homepageBulletTwo + '</span><br /><span class="sub-title"><i class="fa fa-code"></i>' + homepageEvents[i].homepageBulletThree + '</h2></span></a><img src="data:image;base64,' + homepageEvents[i].eventBackgroundImage + '" /></li>';
		console.log(homepageEvents[i].eventName);
		}*/

		$('#frontpage-slideshow').append(theHomepageSlider);
	});
});
