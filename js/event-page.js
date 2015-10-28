'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {
	$.get('/events', function (data) {
		var pathname = window.location.pathname.slice(1);
		var eventsObj = {};
		$(data).each(function (i, elem) {
			eventsObj[elem.id] = {};
			eventsObj[elem.id]['eventName'] = elem.eventName;
			eventsObj[elem.id]['overviewHtml'] = '';
			eventsObj[elem.id]['eventUrl'] = elem.eventUrl;
			eventsObj[elem.id]['eventStartDate'] = elem.eventStartDate;
			eventsObj[elem.id]['eventEndDate'] = elem.eventEndDate;
			eventsObj[elem.id]['eventHeaderImage'] = elem.eventHeaderImage;
			eventsObj[elem.id]['eventBackgroundImage'] = elem.eventBackgroundImage;
			eventsObj[elem.id]['eventSlideUpText'] = elem.eventSlideUpText;
		})
		$.get('/eventoverviews', function (overviews) {
			$(overviews).each(function (i, elem) {
				if (!eventsObj[elem.eventId]['headingText']) {
					eventsObj[elem.eventId]['headingText'] = [];
				}
				if (!eventsObj[elem.eventId]['paragraphText']) {
					eventsObj[elem.eventId]['paragraphText'] = [];
				}
				eventsObj[elem.eventId]['headingText'].push(elem.headingText);
				eventsObj[elem.eventId]['paragraphText'].push(elem.paragraphText);
			})
			for (var key in eventsObj) {
				console.log(eventsObj[key].headingText)
				eventsObj[key].overviewHtml += '<h2>' + eventsObj[key].eventName + '</h2>';
			/*	for (var i = 0; i < eventsObj[key].headingText.length; i++) {
					eventsObj[key].headingText
					// console.log(eventsObj[key].headingText[i])
				}*/
			}
			for (var key in eventsObj) {
				if (pathname === eventsObj[key].eventUrl) {
					$('#event-overview').append(eventsObj[key].overviewHtml); 
				}
			}
			console.log(eventsObj);
		})
	})
})