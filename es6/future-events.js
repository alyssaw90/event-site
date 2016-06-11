'use strict';
/*global $ */
/*global document */
/*global window */
/*global changeHeight */

const jQuery = require('jquery');
require('dotenv').load();
import * as customFunctions from './common-functions.build.js';

(function($) {

	$(document).ready(function () {
		let $eventBlock = $('.event_block');
		//make block slide up effect for upcoming event blocks
		$eventBlock.hover(
			function () {
				let $theHtml = $(this).html();
				
				$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
				$(this).find('h1').animate({opacity: 0}, 0);
				$(this).find('h3').animate({opacity: 0}, 0);
				$(this).find('p').show();
				$(this).find('p').animate({opacity: 1}, 200);
			},
			function () {
				$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200);
				$(this).find('h1').animate({opacity: 1}, 0);
				$(this).find('h3').animate({opacity: 1}, 0);
				$(this).find('p').hide();
				$(this).find('p').animate({opacity: 0}, 0);
			});

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

			

		//convert rbg colors to hex
		function rgb2hex(rgb) {
   		if (  rgb.search('rgb') === -1 ) {
  	      return rgb;
   		} else {
 	     		rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
 	     		function hex(x) {
        		return ('0' + parseInt(x).toString(16)).slice(-2);
 	     }
 	     return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
     	}
		}
		
		//get color contrast
		function invertColor(hexColor) {
	    let color = hexColor;
	    color = color.substring(1);           // remove #
	    color = parseInt(color, 16);          // convert to integer
	    color = 0xFFFFFF ^ color;             // invert three bytes
	    color = color.toString(16);           // convert to hex
	    color = ('000000' + color).slice(-6); // pad with leading zeros
	    color = '#' + color;                  // prepend #
	    return color;
	}
		function getContrastYIQ(hexcolor){
			let r = parseInt(hexcolor.substr(0,2),16);
			let g = parseInt(hexcolor.substr(2,2),16);
			let b = parseInt(hexcolor.substr(4,2),16);
			let yiq = ((r*299)+(g*587)+(b*114))/1000;
			return (yiq >= 128) ? 'black' : 'white';
		}
		//for Accessibility

		$('map area').attr('tabindex', '-1');

		$eventBlock.each(function(index, el) {
			let $this =  $(this);
			let bgColor = $this.css('background-color');
			let hxC =  rgb2hex(bgColor);
			let textColor = invertColor(hxC);
			console.log('hola      ', getContrastYIQ(textColor));
			$this.find('h1, p, li').css('color', textColor);
		});
	});

	$(window).load(function() {
	  customFunctions.changeHeight('.event_block');
	});


	$(window).resize(function(){
	  customFunctions.changeHeight('.event_block');
	});


})(jQuery);
