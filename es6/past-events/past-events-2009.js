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
	
		$( "#2009_events" ).click(function () {
	
	
			let schedule = `<table cellspacing="0" cellpadding="0">
												<thead><tr>
													<th>Name</th>
													<th>Date</th>
													<th>Location</th>
													<th>Technical Topics</th>
													<th>Related Materials</th>
											</tr></thead>
												<tbody><tr>
													<td>DII Workshop</td>
													<td>November 12, 2009</td>
													<td>Brussels, Belgium</td>
													<td>Document validation, ODF interoperability, tool showcases, and use of Markup Compatibility and Extensibility (MCE) in Office 2010</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event111209">Summary, downloads, and photos</a></td>
												</tr><tr>
													<td>DII Workshop on MCE</td>
													<td>September 18, 2009</td>
													<td>Redmond, WA</td>
													<td>Markup Compatibility and Extensibility (MCE) and extension lists in Word 2010, Excel 2010, and PowerPoint 2010, and related topics</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event091809">Summary and downloads</a></td>
												</tr><tr>
													<td>Microsoft SNIA File Sharing 2009 Plugfest</td>
													<td>September 14-17, 2009</td>
													<td> - </td>
													<td>SMB and SMB2 protocol specifications</td>
													<td> - </td>
												</tr><tr>
													<td>DII Workshop on Public Sector Interoperability</td>
													<td>June 30, 2009</td>
													<td>Berlin, Germany</td>
													<td>Document interoperability and related topics. 2nd annual event</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event063009">Summary and photos</a></td>
												</tr><tr>
													<td>Microsoft File Sharing Protocols 2009 Plugfest</td>
													<td>June 1-4, 2009</td>
													<td> - </td>
													<td>SMB and SMB2 and other file sharing protocol specification</td>
													<td> - </td>
												</tr><tr>
													<td>DII Workshop on Open XML / UOF Translator</td>
													<td>May 25, 2009</td>
													<td>Beijing, China</td>
													<td>Open XML/UOF translator project work led by Beihang University at <a href="http://uof-translator.sourceforge.net/">http://uof-translator.sourceforge.net/</a> and related topics</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event052509">Summary and photos</a></td>
												</tr><tr>
													<td>DII Workshop on the Fraunhofer FOKUS Validator</td>
													<td>May 18, 2009</td>
													<td>London, UK</td>
													<td>Fraunhofer FOKUS IS29500 Validator and Document Library project and related topics</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event051809">Summary and downloads</a></td>
												</tr><tr>
													<td>Microsoft Certificate Protocols 2009 Plugfest</td>
													<td>March 30-April 2, 2009</td>
													<td> - </td>
													<td>Certificate protocol specifications</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event033009">Summary</a></td>
												</tr><tr>
													<td>Microsoft Active Directory Protocols 2009 Plugfest</td>
													<td>January 26-30, 2009</td>
													<td> - </td>
													<td>Active Directory protocol specifications</td>
													<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event012609">Summary and photos</a></td>
												</tr></tbody>
											</table>`;
			let html = $.parseHTML(schedule);
			$(this).siblings().removeClass('selected-year');
			$(this).toggleClass('selected-year');
			if ($calendar.html() === schedule) {
				$calendar.empty();
			} else {
				$calendar.empty();
				$calendar.append(html);
			}
			customFunctions.stickyFooter();
	
		});
	
	});

})(jQuery);

