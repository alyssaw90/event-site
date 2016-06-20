'use strict'; 
/*global $ */
/*global document */
/*global window */
let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	$(function () {

		//create bing map

		if (window.location.pathname === '/future-events') {

			//add pins to map
			function getMap() {
				//choose element to place map in and choose options
				let map = new Microsoft.Maps.Map(document.getElementById('eventsMap'), {
 	   			credentials: 'AsQgDPDncnnJ8Zf6TkAuZVBQUVtzAe2-h_sjl4OxiTF2XFLIJF9rbMMPU5Oucd5v',
 	   			width: 800,
 	   			height: 800,
 	   			zoom: 2.25,
 	   			enableSearchLogo: false,
 	   			customizeOverlays: true
 	   		});
	
 	   		//get use location and set it as the center of the map
 	   		let geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(map);
	
 	   		geoLocationProvider.getCurrentPosition({
 	   			successCallback: function(object) {
 	   				map.setView({zoom: 2.25})
 	   			}
 	   		}); 	

				$.get('/allevents', function(data) {
					for (let i = 0, j = data.length; i < j; i++) {
						let searchString = data[i].eventLocation.trim().replace(/\s+/g, '%20');;
						let searchUrl = `http://dev.virtualearth.net/REST/v1/Locations?query=${searchString}&key=AsQgDPDncnnJ8Zf6TkAuZVBQUVtzAe2-h_sjl4OxiTF2XFLIJF9rbMMPU5Oucd5v`;
						let today = new Date();
						let mapIcon;
						let city;
						let cityArr = data[i].eventLocation.split('_');
						
            for (let index = 0, j = cityArr.length; index < j; index++) {
              cityArr[index] = cityArr[index].charAt(0).toUpperCase() + cityArr[index].slice(1);
            }
            city = cityArr.join(' ');
						if (new Date(data[i].eventEndDate) > today || data[i].eventEndDate === null) {
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
									htmlContent: `<span class="tooltip" title="${city}"><img src="./uploads/${mapIcon}" /></span>`
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
	   		});;
   		}
    	  
		Microsoft.Maps.loadModule('Microsoft.Maps.Overlays.Style', { callback: getMap });	

		}
	 	
	});
	
})(jQuery);
