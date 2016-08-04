// 'use strict';
// /*global $ */
// /*global document */
// /*global window */
// /*global stickyFooter */
// /*jshint multistr: true */ 

// let jQuery = require('jquery');
// import * as customFunctions from '../common-functions.build.js';

// (function($) {

//   $(document).ready(function () {

//     let $calendar = $('#calendar');
//     let $pastEventsDiv = $( '#2013_events' );

//     let showSchedule = function(e) {
//       let html;
//       let schedule = `<table id="2013PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
// 													<thead><tr>
// 													<th>Name</th>
// 													<th>Date</th>
// 													<th>Location</th>
// 													<th>Technical topics</th>
// 													<th>Related Materials</th>
// 												</tr></thead>
// 												<tbody><tr>
// 													<td>Shanghai Interoperability Protocols Seminar</td>
// 													<td>December 10-12, 2013</td>
// 													<td>Shanghai, China</td>
// 													<td> - </td>
// 													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interoperability-Protocols-Seminar-2013">Videos</a></td>
// 												</tr><tr>
// 													<td>SNIA Storage Developers conference and Plugfest 2013</td>
// 													<td>September 16-19, 2013</td>
// 													<td>Santa Clara, CA</td>
// 													<td>SMB, SMB2 and SMB3 file sharing protocols</td>
// 													<td><a href="http://www.snia.org/events/storage-developer2013/presentation">Website</a></td>
// 												</tr><tr>
// 													<td>Redmond Interoperability Protocols Plugfest 2013</td>
// 													<td>June 24-28, 2013</td>
// 													<td>Redmond, WA</td>
// 													<td>Exchange RPC and Web Services and Office SharePoint Specifications; Windows Identity; Active Directory, File Sharing and Authentication Specifications; SQL and OData Protocols</td>
// 													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2013">Videos</a></td>
// 												</tr><tr>
// 													<td>Taipei Interoperability Protocols Plugfest</td>
// 													<td>April 23-25, 2013</td>
// 													<td>Taipei, Taiwan</td>
// 													<td>Windows RDP, Exchange and SharePoint Protocols</td>
// 													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Protocols-Plugfest-2013">Videos</a></td>
// 												</tr></tbody>
// 											</table>`;
        
      
//       html = $.parseHTML(schedule);
//       customFunctions.showCalendarOfPastEvents(html, $pastEventsDiv, $calendar);
//       // console.log('past:    ', $('#firstPastEventHeader'));
//       customFunctions.stickyFooter();
//       $('#2013PastEvents').focus();
//       /*$('th, td').attr('tabindex', '0');
//       $('td a:only-child').parent('td').attr('tabindex', '-1');*/

//     }

//     $pastEventsDiv.click(showSchedule);
//     $pastEventsDiv.keydown(function (e) {
//       let keyCode = customFunctions.getKeyCode(e);
//       if (keyCode === 13) {
//         showSchedule();
//       }
//     });

//   });
// })(jQuery);
