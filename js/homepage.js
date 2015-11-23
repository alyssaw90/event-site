'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 


//This function is now in the kickstart.js file line 50


// $(document).ready(function () {
// 	$.get('/homepageteam', function (homepageTeam) {
// 		var theHomepageTeam = '<h2>Meet the Team</h2>';
// 		for (var i = 0, j = homepageTeam.length; i < j; i++) {
// 			theHomepageTeam += '<div class="col_3 individual-homepage-expert"><a href="/meet-the-team#' + homepageTeam[i].divId + '"><img class="pull-left" title="' + homepageTeam[i].msTeamTitle + '" src="../upload/' + homepageTeam[i].headShot + '" /><h6>' + homepageTeam[i].firstName + ' ' + homepageTeam[i].lastName + '</h6><p>' + homepageTeam[i].msTeamTitle + '</p></a></div>';
// 		}
// 		// theHomepageTeam += '<hr class="alt1" />';
// 		$('#homepage-team').prepend(theHomepageTeam + '<hr class="alt1" />');
// 	});

/*	$.get('/events', function (homepageEvents) {
		var theHomepageSlider = '';
		var slideOne = '';
		var slideTwo = '';
		for (var i = 0, j = homepageEvents.length; i < j; i++) {
			theHomepageSlider += '<li><a href="/' + homepageEvents[i].eventUrl + '"><h2 class="desc"><span class="slide-title">'+ homepageEvents[i].eventName + '</span><br /><br /><span class="sub-title slideshow-city">' + homepageEvents[i].eventLocation + '</span><span class="sub-title slideshow-date">' + homepageEvents[i].eventStartDate + '</span><br /><br /><span class="sub-title"><i class="fa fa-code"></i>'+ homepageEvents[i].homepageBulletOne + '</span><br /><span class="sub-title"><i class="fa fa-code"></i>' + homepageEvents[i].homepageBulletTwo + '</span><br /><span class="sub-title"><i class="fa fa-code"></i>' + homepageEvents[i].homepageBulletThree + '</h2></span></a><img src="data:image;base64,' + homepageEvents[i].eventBackgroundImage + '" /></li>';
		console.log(homepageEvents[i].eventName);
		}*/

// 		$('#frontpage-slideshow').append(theHomepageSlider);
// 	});
// });

$(document).ready(function () {
	//array of ms colors at 50% opacity - ms yellow is removed, because it's to light for background color
	var msColors = [/*'rgba(255, 185, 0, .5)', */'rgba(216, 59, 1, .5)', 'rgba(232, 17, 35, .5)', 'rgba(180, 0, 158, .5)', 'rgba(92, 45, 145, .5)', 'rgba(0, 120, 215, .5)', 'rgba(0, 130, 114, .5)', 'rgba(16, 124, 16, .5)'];
	//randomly assign background-color to the slides -- .slideshow li:nth-child(2) h2:first-child
	$('.slideshow li').each(function (i) {
		var randomNum = Math.floor(Math.random() * 7);
		if (i > 0) {
			$(this).children().children().css('background-color', msColors[randomNum]);
		} else if (i = 0) {
			$(this).children().children().css('background-color', 'transparent');
		}

	})
})
