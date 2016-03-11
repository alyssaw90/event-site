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
	//when one of the li tabs is clicked wait 10 milliseconds and fire the stickyFooter function
	$('li').click(function() {
		setTimeout(function() {homepageStickyFooter()}, 10);
	});
	//get events api
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
		//loop over returned events object and make an object for each event
		for (var i = 0, j = events.length; i < j; i++) {
			eventsObj[events[i].id] = {};
			eventsObj[events[i].id].htmlContent = '';
			eventsObj[events[i].id].eventUltHtml = '<ul class="tabs left" id="eventTabLinks">';
			eventsObj[events[i].id].eventDivHtml = '';
			eventsObj[events[i].id].speakersHtml =  '';
			eventsObj[events[i].id].tabs = [];
			eventsObj[events[i].id].eventUrl = events[i].eventUrl;
			eventsObj[events[i].id].eventSpeakers = [];
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
		}
		//call eventTabs api and get tabs for each event
		$.get('/eventTabs', function(eventsTabs) {
			for (var key in eventsTabs) {
				// push those tabs to the tabs array for each object
				eventsObj[eventsTabs[key].eventId].tabs.push(eventsTabs[key]);
			}
			//call the contact api and get the contacts
			$.get('/contacts', function(attendees) {
				//loop over the eventsObj
				for (var key in eventsObj) {
					//if the event has speakers
					if (eventsObj[key].eventSpeakers) {
						// loop through the string of attendees for the event
						for (var i = 0, j = attendees.length; i < j; i++) {
							var attendeeId = attendees[i].id.toString()
							// if the id of an attendee matches one of the IDs from the speakers string, replace the value from the eventSpeakers array with the speaker's object
							if (eventsObj[key].eventSpeakers.indexOf(attendeeId) > -1) {
								console.log(eventsObj[key].eventSpeakers.indexOf(attendeeId));
								eventsObj[key].eventSpeakers[eventsObj[key].eventSpeakers.indexOf(attendeeId)] = attendees[i];
							}
						}
						console.log(eventsObj[key].eventSpeakers);
					}
					//if there are speakers in the speakers array
					if (eventsObj[key].eventSpeakers) {
					//loop over the speakers array and create html for speakers tab
						for (var i = 0, j = eventsObj[key].eventSpeakers.length; i < j; i++) {
							eventsObj[key].speakersHtml += '<h4>' + eventsObj[key].eventSpeakers[i].firstName + ' ' + eventsObj[key].eventSpeakers[i].lastName + '</h4>';
							if (eventsObj[key].eventSpeakers[i].msTeamTitle) {
								eventsObj[key].speakersHtml += '<h5>' + eventsObj[key].eventSpeakers[i].msTeamTitle + '</h5><p>';
							}
							if (eventsObj[key].eventSpeakers[i].headShot) {
								eventsObj[key].speakersHtml += '<img class="pull-left speakersImg" height="165" width="165" src="../uploads/' + eventsObj[key].eventSpeakers[i].headShot + '" />';
							}
							if (eventsObj[key].eventSpeakers[i].contactDescription) {
						 		eventsObj[key].speakersHtml += eventsObj[key].eventSpeakers[i].contactDescription + '</p>';
							}
							eventsObj[key].speakersHtml += '<hr class="alt1" />';
						}
						
					}
					//loop over the event tabs and create the html for the tabs
					for (var i = 0, j = eventsObj[key].tabs.length; i < j; i++) {
						//create the first tab with the first and current classes
						if (i === 0) {
							eventsObj[key].eventUltHtml += '<li class="first current"><a href="#thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '"><h5>' + eventsObj[key].tabs[i].tabTitle + '</h5></a></li>';
							eventsObj[key].eventDivHtml += '<div id="thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '" class="tab-content eventTabDiv" style="display:block;">' + eventsObj[key].tabs[i].tabContent  + '</div>';

						}
						//create the tabs that aren't first or last
						if (i > 0 && i <= eventsObj[key].tabs.length - 1) {
							eventsObj[key].eventUltHtml += '<li><a href="#thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '"><h5>' + eventsObj[key].tabs[i].tabTitle + '</h5></a></li>';
							eventsObj[key].eventDivHtml += '<div id="thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '" class="tab-content eventTabDiv" style="display:none;">' + eventsObj[key].tabs[i].tabContent  + '</div>';

						}
						//if there are speakers add their html as the last tab
						if (eventsObj[key].eventSpeakers && i >= eventsObj[key].tabs.length - 1) {
							eventsObj[key].eventUltHtml += '<li class="last"><a href="#thisEvent-speakers"><h5>Speakers</h5></a></li>';
							eventsObj[key].eventDivHtml += '<div id="thisEvent-speakers" class="tab-content eventTabDiv" style="display:none;">' + eventsObj[key].speakersHtml  + '</div>';
						}
						//if there are no speakers add the last eventTab as the last tab
						if (!eventsObj[key].eventSpeakers && i >= eventsObj[key].tabs.length - 1) {
							eventsObj[key].eventUltHtml += '<li class="last"><a href="#thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '"><h5>' + eventsObj[key].tabs[i].tabTitle + '</h5></a></li>';
							eventsObj[key].eventDivHtml += '<div id="thisEvent-' + eventsObj[key].tabs[i].tabTitle.replace(/[^A-Z0-9]/ig, '') + '" class="tab-content eventTabDiv" style="display:none;">' + eventsObj[key].tabs[i].tabContent  + '</div>';

						}
						//add the closing ul tag
						if (i >= eventsObj[key].tabs.length - 1) {
							eventsObj[key].eventUltHtml += '</ul>';
						}
					}
					//create the html string
					eventsObj[key].htmlContent = eventsObj[key].eventUltHtml + eventsObj[key].eventDivHtml;
					//check if the event url matches the current url
					if (pathname === eventsObj[key].eventUrl) {
						//set the title to the event bame
						document.title = eventsObj[key].eventName;
						//hide the children of the $eventTabs
						$eventTabs.children().hide();
						//if there is a header image add it, if not remove the div
						if (eventsObj[key].eventHeaderImage) {
							$eventHeader.html('<img src="../uploads/' + eventsObj[key].eventHeaderImage + '" />');
						} else if (!eventsObj[key].eventHeaderImage) {
							$eventHeader.remove();
						}
						//add the html content to the $eventTabs div
						$eventTabs.html(eventsObj[key].htmlContent);

						//if there is no hash in the route
						if (!window.location.hash) {
						//assign first and current classes to first tab li(s) so they display correctly
							$('.tabs').children().each(function (i) {
								if ($(this).is(':first-child')) {
									$(this).siblings().removeClass('current');
									$(this).addClass('current');
									$($('a', this).attr('href')).show();
								}
							});
						}

					}
					//if there is a hash in the route
					if (window.location.hash) {
						//loop over the children of the tabs (the tabDivs)
						$('.tabs').children().each(function (i, elem) {
							//if the has value of the a link of this matches the hash in the url
							if ($($('a', this))[0].hash === window.location.hash) {
								//remove the current class from the other divs
								$(this).siblings().removeClass('current');
								//add current class to this div
								$(this).addClass('current');
								//show the div that matches the href of the "a" tag of this, for this function, $('a', this).attr('href') and  $(window.location.hash) are the same
								$($('a', this).attr('href')).show();
								// $(window.location.hash).show();
								//hid the siblings of a div with an id of the hash from the url
								$(window.location.hash).siblings().hide();
								//show the tabs
								$('.tabs').show();
							}
						});
					}
					//once all images are loaded fire the sticky footer functions
					$('img').bind('load', function() {
    				stickyFooter();
    				homepageStickyFooter();
					});
				}

			})
		});
	});

});