'use strict'; 
/*global $ */
/*global document */
/*global window */
let jQuery = require('jquery');
import * as customFunctions from './common-functions.build.js';

(function($) {

	$(function () {

		//urlify a string function
		function urlify(str, lngth) {
		  let strArr = [];
		  let tmpStr = '';
		  tmpStr = str.slice(0, lngth);
		  for (let i = 0; i < tmpStr.length; i++) {
		    if (tmpStr.charAt(i) !== ' ') {
		      strArr.push(tmpStr.charAt(i));
		    }
		    if (tmpStr.charAt(i) === ' ') {
		      strArr.push('%20');
		    }
		  }
		  tmpStr = strArr.join('');
		  return tmpStr;
		}

		//create bing map

		if (window.location.pathname === '/future-events') {

			let map = new Microsoft.Maps.Map(document.getElementById('eventsMap'), {
 	   		credentials: 'AsQgDPDncnnJ8Zf6TkAuZVBQUVtzAe2-h_sjl4OxiTF2XFLIJF9rbMMPU5Oucd5v',
 	   		width: 800,
 	   		height: 800,
 	   		zoom: 2.25,
 	   		enableSearchLogo: false
 	   	});
	
			//add pins to map
			function getMap() {
    	  function displayEventInfo(e) {
    	    window.location = '/redmond2016'
    	  }

				$.get('/allevents', function(data) {
					for (let i = 0, j = data.length; i < j; i++) {
						let searchString = urlify(data[i].eventLocation);
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
								pushpin.setLocation(new Microsoft.Maps.Location(data2.resourceSets[0].resources[0].geocodePoints[0].coordinates[0], data2.resourceSets[0].resources[0].geocodePoints[0].coordinates[1])); 
								map.entities.push(pushpin);
	    				},
	    				error: function(err) {
	    					console.log('error');
	    				}
						})
					}
				});

   		}
    	  
	
   		getMap();
	
   		$('.MicrosoftMap').css({
   			width: '100%'
   		});;

		}
	 	
	});
	
})(jQuery);
