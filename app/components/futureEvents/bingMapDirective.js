'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const bingMapDirective = (app) => {
	app.directive('bingMapDirective', ['$timeout', function($timeout) {
		const bingMapDirectiveDefinitionObject = {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, element, attrs) {
				// //choose element to place map in and choose options
				// let map = new Microsoft.Maps.Map(document.getElementById('eventsMap'), {
 	  //  			credentials: scope.bingMapKey,
 	  //  			width: 800,
 	  //  			height: 800,
 	  //  			zoom: 2.25,
 	  //  			enableSearchLogo: false,
 	  //  			customizeOverlays: true
 	  //  		});
 	   	
 	  //  		$timeout(function() {
				// 	//loop over the array of events and search bing maps for each location
	 	 //   		for (let i = 0, len = scope.mapEvents.length; i < len; i++) {
	 	 //   			//replace all spaces with '%20' for search string
	 	 //   			let searchString = scope.mapEvents[i].eventLocation.trim().replace(/\s+/g, '%20');
	 	 //   			//add the search string and the map key to create the search URL
	 	 //   			let searchUrl = `http://dev.virtualearth.net/REST/v1/Locations?query=${encodeURIComponent(searchString)}&jsonp=JSON_CALLBACK&key=${scope.bingMapKey}`;
				// 		console.log('hakdhflkdh    ', searchUrl);
				// 		let today = new Date();
				// 		let mapIcon;
				// 		let city;
				// 		//separate the city name by underscore for multiple word city names and then capitalize all the first letters of city names
				// 		let cityArr = scope.mapEvents[i].eventLocation.split('_');
				// 		for (let index = 0, j = cityArr.length; index < j; index++) {
	   //          cityArr[index] = cityArr[index].charAt(0).toUpperCase() + cityArr[index].slice(1);
	   //        }
	   //        city = cityArr.join(' ');
	   //        //assign the colored or gray icon depending on whether the event is over or not
				// 		if (new Date(scope.mapEvents[i].eventEndDate) > today || scope.mapEvents[i].eventEndDate === null || (new Date(scope.mapEvents[i].eventEndDate).getMonth() === 11 && new Date(scope.mapEvents[i].eventEndDate).getDate() === 31 )) {
				// 			mapIcon = 'favicon.png';
				// 		} else {
				// 			mapIcon = 'favicon-gray.png';
				// 		}

				// 		scope.addPushpins(searchUrl);
	 	   			
	 	 //   		}
 	   			
 	  //  		}, 500);
 	  //add pins to map
			function getMap() {
				//get bing map
				jQuery.get('/bingmapkey', function(apiKey) {
					//choose element to place map in and choose options
					let map = new Microsoft.Maps.Map(document.getElementById('eventsMap'), {
 	   				credentials: apiKey,
 	   				width: 800,
 	   				height: 800,
 	   				zoom: 2.25,
 	   				enableSearchLogo: false,
 	   				customizeOverlays: true
 	   			});
	
					jQuery.get('/mapevents', function(data) {
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
							if (new Date(data[i].eventEndDate) > today || data[i].eventEndDate === null || (new Date(data[i].eventEndDate).getMonth() === 11 && new Date(data[i].eventEndDate).getDate() === 31 )) {
								mapIcon = 'favicon.png';
							} else {
								mapIcon = 'favicon-gray.png';
							}
							jQuery.ajax({
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
										htmlContent: `<span class="tooltip" title="${city}"><img alt="push pin for ${city}" src="app/uploads/${mapIcon}" /></span>`
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
	
	   			jQuery('.MicrosoftMap').css({
	   				width: '100%'
	   			});
	
	   			//get user location and set it as the center of the map
	   			let geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(map);
	
	   			geoLocationProvider.getCurrentPosition({
	   				successCallback: function(object) {
	   					map.setView({zoom: 2.25});
	   					jQuery('#navMenuBeginning').focus();
	   				}
	   			}); 	
				});

   		}
    	
    	//load bing map theme module and call getMap callback  
			Microsoft.Maps.loadModule('Microsoft.Maps.Overlays.Style', { callback: getMap });

			//add title for accessibility
			window.onload = function() {
				jQuery('.NavBar_dropIconContainer').attr('title', 'Navigation bar drop icon containter');
				jQuery('.MicrosoftMap').find('img').attr('alt', 'map image');
	   		// customFunctions.stickyFooter();
			}
			setTimeout(function() {
				jQuery('#mainNav').focus();
				jQuery('svg').attr('tabindex', '-1');
				jQuery('.MicrosoftMapDrawing').attr('tabindex', '-1');

				jQuery('a.pushpinLabel').each(function(index, el) {
					let $this = jQuery(this);
					let altTag = $this.find('img').attr('alt');
					$this.attr('aria-label', altTag);
				});
			}, 2000);

			}
		};
  	return bingMapDirectiveDefinitionObject
	}])
};

module.exports = bingMapDirective;