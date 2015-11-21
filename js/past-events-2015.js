'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {

	var $calendar = $('#calendar');

	$( "#2015_events" ).click(function () {


		var schedule = '<table cellspacing="0" cellpadding="0">\
										<thead><tr>\
											<th>Name</th>\
											<th>Date</th>\
											<th>Number of Attendees</th>\
											<th>Technical Topics</th>\
											<th>Related Materials</th>\
										</tr></thead>\
										<tbody><tr>\
											<td><a href="/event/shanghaiinteropdevdays2015-2026">Shanghai Interop Dev Days 2015 – Shanghai, China</a></td>\
											<td>October 21 - 22, 2015</td>\
											<td> - </td>\
											<td>File Systems, Software Defined Storage, SMB, Security, Performance, and more.</td>\
											<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interop-Dev-Days">Videos</a>, <a id="shanghai2015" href="#">Pictures</a></td>\
										</tr><tr>\
											<td>Redmond Interoperability Protocols Plugfest 2015 – Redmond, WA</td>\
											<td>June 22-26, 2015</td>\
											<td> - </td>\
											<td>MailSim, Message Analyzer, FSSHTTP, O365 Developer Experience, OData, Exchange REST APIs, Office Parsers, Skype for Business Protocols, and Exchange ActiveSync.</td>\
											<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2015">Videos</a></td>\
										</tr><tr>\
											<td>sambaXP 2015 – Göttingen, Germany</td>\
											<td>May 19-22, 2015</td>\
											<td> - </td>\
											<td> - </td>\
											<td><a href="http://www.sambaxp.org/">Recordings and slides</a></td>\
										</tr><tr>\
											<td>Protocols Plugfest Europe 2015 – Zaragoza, Spain</td>\
											<td>May 12-14, 2015</td>\
											<td> - </td>\
											<td> - </td>\
											<td><a href="http://www.protocolsplugfest.com/europe/program/">Videos</a></td>\
										</tr><tr>\
											<td>Taipei Interoperability Plugfest and Server TechFest 2015 – Taipei, Taiwan</td>\
											<td>March 24-26, 2015</td>\
											<td> - </td>\
											<td>Office 365 authentication, Microsoft Cloud Foundation, Office Online, Office BI Power Tools, OData, Message Analyzer, Lync, and ActiveSync.</td>\
											<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Plugfest-and-Server-TechFest-2015">Videos</a></td>\
										</tr><tr>\
											<td>Beijing Interop Seminar 2015 – Beijing, China</td>\
											<td>March 16-17, 2015</td>\
											<td> - </td>\
											<td>Office File Formats and the latest in Office developer and product technology.</td>\
											<td><a href="http://connect.microsoft.com/site216/Downloads/DownloadDetails.aspx?DownloadID=57585">Presentation handouts</a></td>\
										</tr></tbody>\
										</table>';

		var html = $.parseHTML(schedule);
		$(this).siblings().removeClass('selected-year');
		$(this).toggleClass('selected-year');
		if ($calendar.html() === schedule) {
			$calendar.empty();
		} else {
			$calendar.empty();
			$calendar.append(html);
		}
	/*	$.get('/allevents/2', function (data) {
			console.log(data)
			$('#shanghai2015').click(function () {
				// alert('hola');
				$calendar.append(data);
			})
		});*/

		$('#shanghai2015').click(function (e) {
			$.get('/allevents/2', function (data) {
				$calendar.fancybox('/allevents/2',
					{
						type: 'image',
						href: '/uploads/shanghaiinteropdevdays2015-2026/_MG_4077.JPG',
						onComplete: function (current, previous) {
							for (var key in this) {
								console.log('KEY :::::::::::   ', key,'     THIS[KEY] :::::::::::::  ', this[key]);
							}
						console.info( 'Current: ', current[0] );        
        		console.info( 'Previous: ', /*(previous ? previous.href : '-')*/previous );
        		
        		/*if (previous) {
        		    console.info( 'Navigating: ' + (current.index > previous.index ? 'right' : 'left') );     
        		}*/
						}
					},
					{
						type: 'image',
						href: '/uploads/shanghaiinteropdevdays2015-2026/_MG_3991.JPG'
					},
					{
						// afterLoad: function (current, previous) {
						// console.info( 'Current: ', current.href );        
      //   		console.info( 'Previous: ', (previous ? previous.href : '-') );
        		
      //   		/*if (previous) {
      //   		    console.info( 'Navigating: ' + (current.index > previous.index ? 'right' : 'left') );     
      //   		}*/
						// }
					}
				)
				$calendar.prepend(data);
			})
			/*.done(function (data2) {
				$calendar.fancybox(
        	{
            href : '/uploads/shanghaiinteropdevdays2015-2026/_MG_3991.JPG',
           	type: 'image',
           	onStart: function(selectedArray, selectedIndex, selectedOptions){
           		console.log('HHHHHHHHHHHHHHHHH ::::::::::: ', $(this));
							return {
								href : "videos/" + selectedArray[selectedIndex].name
							}
						},
           	onComplete: function(){
							console.log($(this)[0].href);
						}

        	},
					{
            href : '/uploads/shanghaiinteropdevdays2015-2026/_MG_4077.JPG',
            type: 'image'
        	},
        	{
						onComplete: function(){
							alert("complete!");
						}
					}
        );
				$calendar.prepend(data2.picsHtml);

			})*/
		})



	});

});