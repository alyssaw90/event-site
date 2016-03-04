'use strict';

/* jshint shadow:true */
/*global $ */
/*global document */
/*global $ */
/*global stickyFooter */
/*global window */
/*global MutationObserver */
/* jshint loopfunc:true */

$(document).ready(function() {
	
	$('li').click(function() {
		setTimeout(function() {homepageStickyFooter()}, 10);
	});

	$.get('/events', function (events) {
		var pathname = window.location.pathname.slice(1);
		var eventsObj = {};
		var $eventTabs = $('#eventTabs');
		var $eventHeader = $('#eventHeader');
		//declare native JS variable for #eventTabs
		var eventTabs = document.querySelector('#eventTabs');
		//set MutationObserver to check for changes to child nodes (e.g. they become visible)
		var observer = new MutationObserver(function (mutations) {
    	stickyFooter();
  	});
  	var observerConfig = {
  		attributes: true, 
  		subtree: true
  	};
  	observer.observe(eventTabs, observerConfig);
		
		for (var i = 0, j = events.length; i < j; i++) {
			eventsObj[events[i].id] = {};
			eventsObj[events[i].id].htmlContent = '';
			eventsObj[events[i].id].eventUltHtml = '<ul class="tabs left" id="eventTabLinks">';
			eventsObj[events[i].id].eventDivHtml = '';
			eventsObj[events[i].id].speakersHtml =  '';
			eventsObj[events[i].id].tabs = [];
			eventsObj[events[i].id].eventUrl = events[i].eventUrl;
			eventsObj[events[i].id].speakersArr = [];
			eventsObj[events[i].id].eventName = events[i].eventName;
			eventsObj[events[i].id].eventRegistrationLink = events[i].eventRegistrationLink;
			eventsObj[events[i].id].eventUrl = events[i].eventUrl;
			eventsObj[events[i].id].eventLocation = events[i].eventLocation;
			eventsObj[events[i].id].eventStartDate = events[i].eventStartDate;
			eventsObj[events[i].id].eventEndDate = events[i].eventEndDate;
			eventsObj[events[i].id].eventHeaderImage = events[i].eventHeaderImage;
			if (events[i].eventSpeakers) {
				eventsObj[events[i].id].eventSpeakers = events[i].eventSpeakers.split(',');

			}
			// console.log(typeof eventsObj[events[i].id].eventSpeakers);
		}

		$.get('/eventTabs', function(eventsTabs) {
			for (var key in eventsTabs) {
				// console.log(eventsTabs[i]);
				eventsObj[eventsTabs[key].eventId].tabs.push(eventsTabs[key]);
					// console.log(eventsObj[eventsTabs[key].eventId].tabs);
			}

			$.get('/contacts', function(attendees) {
				for (var key in eventsObj) {
					if (eventsObj[key].eventSpeakers) {
						// console.log(eventsObj[key].eventSpeakers.indexOf('1'));
						for (var i = 0, j = attendees.length; i < j; i++) {
							// console.log(eventsObj[key].eventSpeakers.indexOf(attendees[i].id.toString()));
							if (eventsObj[key].eventSpeakers.indexOf(attendees[i].id.toString()) > -1) {
								eventsObj[key].speakersArr.push(attendees[i]);
							}
						}
						
					}
					if (eventsObj[key].speakersArr) {
					//loop over the speakers array and create html for speakers tab
						for (var i = 0, j = eventsObj[key].speakersArr.length; i < j; i++) {
							eventsObj[key].speakersHtml += '<h4>' + eventsObj[key].speakersArr[i].firstName + ' ' + eventsObj[key].speakersArr[i].lastName + '</h4>';
							if (eventsObj[key].speakersArr[i].msTeamTitle) {
								eventsObj[key].speakersHtml += '<h5>' + eventsObj[key].speakersArr[i].msTeamTitle + '</h5><p>';
							}
							if (eventsObj[key].speakersArr[i].headShot) {
								eventsObj[key].speakersHtml += '<img class="pull-left speakersImg" height="165" width="165" src="../uploads/' + eventsObj[key].speakersArr[i].headShot + '" />';
							}
							if (eventsObj[key].speakersArr[i].contactDescription) {
						 		eventsObj[key].speakersHtml += eventsObj[key].speakersArr[i].contactDescription + '</p>';
							}
							eventsObj[key].speakersHtml += '<hr class="alt1" />';
						}
						
					}

					for (var i = 0, j = eventsObj[key].tabs.length; i < j; i++) {
						if (i === 0) {
							eventsObj[key].eventUltHtml += '<li class="current"><a href="#thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '"><h5>' + eventsObj[key].tabs[i].tabTitle + '</h5></a></li>';
							eventsObj[key].eventDivHtml += '<div id="thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '" class="tab-content eventTabDiv" style="display:block;">' + eventsObj[key].tabs[i].tabContent  + '</div>';

						}
						if (i > 0) {
							eventsObj[key].eventUltHtml += '<li><a href="#thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '"><h5>' + eventsObj[key].tabs[i].tabTitle + '</h5></a></li>';
							eventsObj[key].eventDivHtml += '<div id="thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '" class="tab-content eventTabDiv" style="display:none;">' + eventsObj[key].tabs[i].tabContent  + '</div>';

						}
						if (eventsObj[key].eventSpeakers && i >= eventsObj[key].tabs.length - 1) {
							eventsObj[key].eventUltHtml += '<li><a href="#thisEvent-speakers"><h5>Speakers</h5></a></li>';
							eventsObj[key].eventDivHtml += '<div id="thisEvent-speakers" class="tab-content eventTabDiv" style="display:none;">' + eventsObj[key].speakersHtml  + '</div>';
						}
						if (i >= eventsObj[key].tabs.length - 1) {
							eventsObj[key].eventUltHtml += '</ul>';
						}
					}

					eventsObj[key].htmlContent = eventsObj[key].eventUltHtml + eventsObj[key].eventDivHtml;
					// console.log(eventsObj[key].htmlContent);
					//check if the event url matches the current url
					if (pathname === eventsObj[key].eventUrl) {
						document.title = eventsObj[key].eventName;
						$eventTabs.children().hide();

						if (eventsObj[key].eventHeaderImage) {
							$eventHeader.html('<img src="../uploads/' + eventsObj[key].eventHeaderImage + '" />');
						} else if (!eventsObj[key].eventHeaderImage) {
							$eventHeader.remove();
						}
						$eventTabs.html(eventsObj[key].htmlContent);

						//assign first and current classes to first tab li(s) so they display correctly
						$('.tabs').children().each(function (i) {
							if ($(this).is(':first-child')) {
								$(this).siblings().removeClass('current');
								$(this).addClass('first current');
								$($('a', this).attr('href')).show();
							}
						});

					}
					$('img').bind('load', function() {
    				stickyFooter();
    				homepageStickyFooter();
					});
					console.log(eventsObj);
				}

			})
		});
	});

});