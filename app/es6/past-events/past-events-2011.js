// 'use strict';
// /*global $ */
// /*global document */
// /*global window */
// /*global stickyFooter */
// /*jshint multistr: true */ 

// let jQuery = require('jquery');
// import * as customFunctions from '../common-functions.js';

// (function($) {

//   $(document).ready(function () {

//     let $calendar = $('#calendar');
//     let $pastEventsDiv = $( '#2011_events' );

//     let showSchedule = function(e) {
//       let html;
//       let schedule = `<table id="2011PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
// 											<thead><tr>
// 												<th>Name</th>
// 												<th>Date</th>
// 												<th>Location</th>
// 												<th>Technical Topics</th>
// 												<th>Related Materials</th>
// 											</tr></thead>
// 											<tbody><tr>
// 													<td>Kerberos.org Interop</td>
// 													<td>October 25-28, 2011</td>
// 													<td>Cambridge, MA</td>
// 													<td>Kerberos authentication protocols</td>
// 													<td><a href="http://www.kerberos.org/events/2011conf-interop/2011slides/2011slides.html">Website</a></td>
// 												</tr><tr>
// 													<td>SNIA.org 2011 Storage Developer Conference</td>
// 													<td>September 19-22, 2011</td>
// 													<td>Santa Clara, CA</td>
// 													<td>CIFS, SMB, and SMB2 file sharing protocol specifications</td>
// 													<td><a href="http://www.snia.org/events/storage-developer2011">Website</a></td>
// 												</tr><tr>
// 													<td>Windows File Sharing and SharePoint Protocols Plugfest</td>
// 													<td>June 20-24, 2011</td>
// 													<td>Redmond, WA</td>
// 													<td>SharePoint File Operations Protocols and SharePoint Front End Protocols; SMB, SMB2 and other Windows File Sharing protocols</td>
// 													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-File-Sharing-and-SharePoint-Protocols-Plugfest-2011">Videos</a></td>
// 												</tr><tr>
// 													<td>Exchange Server Select RPC</td>
// 													<td>January 24-28, 2011</td>
// 													<td> - </td>
// 													<td>Exchange Server RPC, ROPS Fast Transfer, and Incremental Change Synchronization protocols</td>
// 													<td><a href="http://channel9.msdn.com/Series/Exchange-RPC-Protocols-Plugfest-January-2011">Videos</a></td>
// 												</tr><tr>
// 													<td>Windows Active Directory Protocols Plugfest</td>
// 													<td>January 2011</td>
// 													<td> - </td>
// 													<td>Active Directory protocols</td>
// 													<td><a href="http://channel9.msdn.com/Series/Windows-AD-Protocols-Plugfest-2011">Videos</a></td>
// 												</tr></tbody>
// 											</table>`;
        
      
//       html = $.parseHTML(schedule);
//       customFunctions.showCalendarOfPastEvents(html, $pastEventsDiv, $calendar);
//       // console.log('past:    ', $('#firstPastEventHeader'));
//       customFunctions.stickyFooter();
//       $('#2011PastEvents').focus();
//      /* $('th, td').attr('tabindex', '0');
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
