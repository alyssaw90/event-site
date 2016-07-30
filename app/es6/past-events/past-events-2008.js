'use strict';
/*global $ */
/*global document */
/*global window */
/*global stickyFooter */
/*jshint multistr: true */ 

let jQuery = require('jquery');
import * as customFunctions from '../common-functions.build.js';

(function($) {

  $(document).ready(function () {

    let $calendar = $('#calendar');
    let $pastEventsDiv = $( '#2008_events' );

    let showSchedule = function(e) {
      let html;
      let schedule = `<table id="2008PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
												<thead><tr>
													<th>Name</th>
													<th>Date</th>
													<th>Location</th>
													<th>Technical Topics</th>
													<th>Related Materials</th>
											</tr></thead>
												<tbody><tr>
													<td>DII Workshop on Translators</td>
													<td>December 2, 2008</td>
													<td>Brussels, Belgium</td>
													<td>ODF/OXML/Legacy translators, Open XML/ODF implementation and related topics</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event120208">Summary and downloads</a></td>
												</tr><tr>
													<td>DII Workshop</td>
													<td>October 23-24, 2008</td>
													<td>Redmond, WA</td>
													<td>Document format test library, validation tools, Open XML interoperability and related topics</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event102308">Summary and downloads</a></td>
												</tr><tr>
													<td>DII Workshop by wipse (Windows + Services Consortium)</td>
													<td>July 30, 2008</td>
													<td>Tokyo, Japan</td>
													<td>Open XML standard interoperability verification lab on multiple-companies products</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event073008">Summary</a></td>
												</tr><tr>
													<td>DII Workshop on ODF 1.1</td>
													<td>July 30, 2008</td>
													<td>Redmond, WA</td>
													<td>ODF and Office 2007 SP2 interoperability and related topics</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event073108">Summary</a></td>
												</tr><tr>
													<td>DII Workshop on Accessibility</td>
													<td>June 10, 2008</td>
													<td>Munich, Germany</td>
													<td>Open XML and DAISY interoperability, high fidelity roaming scenarios, OXML SDK, and related topics</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event061008">Summary and video</a></td>
												</tr><tr>
													<td>DII Workshop on Open XML / UOF</td>
													<td>March 29, 2008</td>
													<td>Beijing, China</td>
													<td>Open XML and UOF interoperability and related topics</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event032908">Summary</a></td>
												</tr><tr>
													<td>DII Workshop on Translation Tools</td>
													<td>March 12, 2008</td>
													<td>Seoul, Korea</td>
													<td>Open XML, DAISY and ODF translation tool showcase , Open XML PowerShell tools available at <a href="http://www.codeplex.com/PowerTools">http://www.codeplex.com/PowerTools</a></td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event031208">Summary and video</a></td>
												</tr><tr>
													<td>DII Workshop at the Microsoft and Novell Interoperability Lab</td>
													<td>March 5, 2008</td>
													<td>Cambridge, MA</td>
													<td>Document Interoperability technical lab testing scenarios and tool development</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event030508">Summary and blog</a></td>
												</tr></tbody>
											</table>`;
        
      
      html = $.parseHTML(schedule);
      customFunctions.showCalendarOfPastEvents(html, $pastEventsDiv, $calendar);
      // console.log('past:    ', $('#firstPastEventHeader'));
      customFunctions.stickyFooter();
      $('#2008PastEvents').focus();
     /* $('th, td').attr('tabindex', '0');
      $('td a:only-child').parent('td').attr('tabindex', '-1');*/

    }

    $pastEventsDiv.click(showSchedule);
    $pastEventsDiv.keydown(function (e) {
      let keyCode = customFunctions.getKeyCode(e);
      if (keyCode === 13) {
        showSchedule();
      }
    });

  });
})(jQuery);
