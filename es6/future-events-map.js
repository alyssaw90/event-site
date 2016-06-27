'use strict'; 
/*global $ */
/*global document */
/*global window */
let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	$(function () {


		if (window.location.pathname === '/future-events') {

			//add pins to map
			function getMap() {
			//get bing map
			$.get('/bingmapkey', function(apiKey) {
				//choose element to place map in and choose options
				let map = new Microsoft.Maps.Map(document.getElementById('eventsMap'), {
 	   			credentials: apiKey,
 	   			width: 800,
 	   			height: 800,
 	   			zoom: 2.25,
 	   			enableSearchLogo: false,
 	   			customizeOverlays: true
 	   		});

				$.get('/allevents', function(data) {
					for (let i = 0, j = data.length; i < j; i++) {
						let searchString = data[i].eventLocation.trim().replace(/\s+/g, '%20');;
						let searchUrl = `https://dev.virtualearth.net/REST/v1/Locations?query=${searchString}&key=${apiKey}`;
						let today = new Date();
						let mapIcon;
						let city;
						let cityArr = data[i].eventLocation.split('_');
						
            for (let index = 0, j = cityArr.length; index < j; index++) {
              cityArr[index] = cityArr[index].charAt(0).toUpperCase() + cityArr[index].slice(1);
            }
            city = cityArr.join(' ');
            console.log('date:               ', new Date(data[i].eventEndDate), '                    ', new Date(new Date().getFullYear().toString()).addDays(366).toString());
						if (new Date(data[i].eventEndDate) > today || data[i].eventEndDate === null || (new Date(data[i].eventEndDate).getMonth() === 11 && new Date(data[i].eventEndDate).getDate() === 31 )) {
							mapIcon = 'favicon.png';
						} else {
							mapIcon = 'favicon-gray.png';
						}
						$.ajax({
							url: searchUrl,
							type: 'GET',
							crossDomain: true,
	    				dataType: 'jsonp',
	    				jsonp: 'jsonp',
	    				success: function(data2) {
				 	  	 	// map.entities.clear(); 
				 	  	 	let currentEventUrl = new Date(data[i].eventEndDate) < new Date('June 1, 2015') &&  data[i].eventEndDate !== null ? 'past-events' : data[i].eventUrl;
								let pushpinOptions = {
									// icon: './uploads/favicon.png', 
									width: 15, 
									height: 15,
									typeName: 'pushpinLabel',
									text: searchString,
									textOffset : new Microsoft.Maps.Point(-45,-25),
									htmlContent: `<span class="tooltip" title="${city}"><img alt="push pin for ${city}" src="./uploads/${mapIcon}" /></span>`
								}; 
								let pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), pushpinOptions);
								let pushpinClick = Microsoft.Maps.Events.addHandler(pushpin, 'click', function() {window.location = `/${currentEventUrl}`});
								let latitude = data2.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
								let longitude =  data2.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
								pushpin.setLocation(new Microsoft.Maps.Location(latitude, longitude)); 
								map.entities.push(pushpin);
	    				},
	    				error: function(err) {
	    					console.log('error');
	    				}
						})
					}
				});

	   		$('.MicrosoftMap').css({
	   			width: '100%'
	   		});

	   		//get user location and set it as the center of the map
	   		let geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(map);

	   		geoLocationProvider.getCurrentPosition({
	   			successCallback: function(object) {
	   				map.setView({zoom: 2.25})
	   			}
	   		}); 	
			});

   		}
    	
    	//load bing map theme module and call getMap callback  
			Microsoft.Maps.loadModule('Microsoft.Maps.Overlays.Style', { callback: getMap });	
				
			//add title for accessibility
			window.onload = function() {
				$('.NavBar_dropIconContainer').attr('title', 'Navigation bar drop icon containter');
				$('.MicrosoftMap').find('img').attr('alt', 'map image');
	   		customFunctions.stickyFooter();
			}
		}
	 	
	});
	
})(jQuery);
