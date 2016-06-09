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

		function GeocodeCallback(result) 
{   
    // Do something with the result
    console.log('result:    ', result);
}
		//create bing map
			let map = new Microsoft.Maps.Map(document.getElementById('eventsMap'), {
 	   		credentials: 'AsQgDPDncnnJ8Zf6TkAuZVBQUVtzAe2-h_sjl4OxiTF2XFLIJF9rbMMPU5Oucd5v',
 	   		width: 800,
 	   		height: 800,
 	   		zoom: 2.25,
 	   		enableSearchLogo: false
 	   	});

		//get all events to add to the map

		function CallRestService(request, callback) {
	    $.ajax({
        	url: request,
        	dataType: "jsonp",
        	jsonp: "jsonp",
        	success: function (r) {
        	    callback(r);
        	},
        	error: function (e) {
        	    alert(e.statusText);
        	}
	    });
		}
		var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=1%20Microsoft%20Way%20Redmond%20WA%2098052&key=AsQgDPDncnnJ8Zf6TkAuZVBQUVtzAe2-h_sjl4OxiTF2XFLIJF9rbMMPU5Oucd5v";

		CallRestService(geocodeRequest, GeocodeCallback);
		
		function GeocodeCallback(result) {
		    // Do something with the result
		    console.log('result:    ', result);
		}
				$.get('/allevents', function(data) {
			console.log('data:              ', data);
			for (let i = 0, j = data.length; i < j; i++) {
				let searchUrl = "http://dev.virtualearth.net/REST/v1/Locations?query=1%20Microsoft%20Way%20Redmond%20WA%2098052&key=AsQgDPDncnnJ8Zf6TkAuZVBQUVtzAe2-h_sjl4OxiTF2XFLIJF9rbMMPU5Oucd5v";
				// let searchUrl = `http://dev.virtualearth.net/REST/v1/Locations?query=1%20Microsoft%20Way%20Redmond%20WA%2098052&jsonp&key=AsQgDPDncnnJ8Zf6TkAuZVBQUVtzAe2-h_sjl4OxiTF2XFLIJF9rbMMPU5Oucd5v&callback=JSON_CALLBACK`;
				// // let searchUrl = `http://dev.virtualearth.net/REST/v1/Locations?query=1%20Microsoft%20Way%20Redmond%20WA%2098052&o=json&key=AsQgDPDncnnJ8Zf6TkAuZVBQUVtzAe2-h_sjl4OxiTF2XFLIJF9rbMMPU5Oucd5v&callback=JSON_CALLBACK`;
				$.ajax({
					url: searchUrl,
					type: 'GET',
					crossDomain: true,
    			dataType: 'jsonp',
    			jsonp: 'jsonp',
    			success: function(data2) {
    				console.log('this is data2     ', data2);
    			},
    			error: function(err) {
    				console.log('error    ', err);
    			}
				})
				/*.done(function(data) {
					console.log("success");
				})
				.fail(function() {
					console.log("error");
				})
				.always(function(data) {
					console.log('this is data:    ', data);
					console.log("complete");
				});*/
				
			}
		});


		function getMap(eventLink, eventLocation, upcomingBool, latLong) {
      function displayEventInfo(e) {
        window.location = '/redmond2016'
      }
 	   /*	let map = new Microsoft.Maps.Map(document.getElementById('eventsMap'), {
 	   		credentials: process.env.BING_MAP_API_KEY,
 	   		width: 800,
 	   		height: 800,
 	   		zoom: 2.25,
 	   		enableSearchLogo: false
 	   	});*/
 	   	map.entities.clear(); 
			let pushpinOptions = {
				// icon: './uploads/favicon.png', 
				width: 15, 
				height: 15,
				typeName: 'pushpinLabel',
				text: 'Redmond, USA',
				textOffset : new Microsoft.Maps.Point(-45,-25),
				htmlContent: '<span class="tooltip" title="Redmond, USA"><img src="./uploads/favicon.png" /></span>'
			}; 
			let pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), pushpinOptions);
			let pushpinClick = Microsoft.Maps.Events.addHandler(pushpin, 'click', displayEventInfo); 
			pushpin.setLocation(new Microsoft.Maps.Location(47.6740, -122.1215)); 
			map.entities.push(pushpin);
   	}

   	/*function attachPushpinClickEvent()
      {
        var pushpin= new Microsoft.Maps.Pushpin(map.getCenter(), null); 
        var pushpinClick= Microsoft.Maps.Events.addHandler(pushpin, 'click', displayEventInfo);  
        map.entities.push(pushpin); 
        alert('Click on newly added pushpin to raise event');
      }*/
      

   	getMap();

   	$('.MicrosoftMap').css({
   		width: '100%'
   	});;

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
