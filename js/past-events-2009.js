'use strict'

$(document).ready(function () {

	var $calendar = $('#calendar');

	$( "#2009_events" ).click(function () {


		var schedule = '<table cellspacing="0" cellpadding="0">\
											<thead><tr>\
												<th>Name</th>\
												<th>Date</th>\
												<th>Number of Attendees</th>\
												<th>Technical Topics</th>\
												<th>Related Materials</th>\
										</tr></thead>\
											<tbody><tr>\
												<td>DII Workshop – Brussels, Belgium</td>\
												<td>November 12, 2009</td>\
												<td>12</td>\
												<td>Document validation, ODF interoperability, tool showcases, and use of Markup Compatibility and Extensibility (MCE) in Office 2010</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event111209">Summary, downloads, and photos</a></td>\
											</tr><tr>\
												<td>DII Workshop on MCE – Redmond, WA</td>\
												<td>September 18, 2009</td>\
												<td>10</td>\
												<td>Markup Compatibility and Extensibility (MCE) and extension lists in Word 2010, Excel 2010, and PowerPoint 2010, and related topics</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event091809">Summary and downloads</a></td>\
											</tr><tr>\
												<td>Microsoft SNIA File Sharing 2009 Plugfest</td>\
												<td>September 14-17, 2009</td>\
												<td>15</td>\
												<td>SMB and SMB2 protocol specifications</td>\
												<td> - </td>\
											</tr><tr>\
												<td>DII Workshop on Public Sector Interoperability – Berlin, Germany</td>\
												<td>June 30, 2009</td>\
												<td> - </td>\
												<td>Document interoperability and related topics. 2nd annual event</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event063009">Summary and photos</a></td>\
											</tr><tr>\
												<td>Microsoft File Sharing Protocols 2009 Plugfest</td>\
												<td>June 1-4, 2009</td>\
												<td>19</td>\
												<td>SMB and SMB2 and other file sharing protocol specification</td>\
												<td> - </td>\
											</tr><tr>\
												<td>DII Workshop on Open XML / UOF Translator – Beijing, China</td>\
												<td>May 25, 2009</td>\
												<td>50</td>\
												<td>Open XML/UOF translator project work led by Beihang University at <a href="http://uof-translator.sourceforge.net/">http://uof-translator.sourceforge.net/</a> and related topics</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event052509">Summary and photos</a></td>\
											</tr><tr>\
												<td>DII Workshop on the Fraunhofer FOKUS Validator – London, UK</td>\
												<td>May 18, 2009</td>\
												<td>15</td>\
												<td>Fraunhofer FOKUS IS29500 Validator and Document Library project and related topics</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event051809">Summary and downloads</a></td>\
											</tr><tr>\
												<td>Microsoft Certificate Protocols 2009 Plugfest</td>\
												<td>March 30-April 2, 2009</td>\
												<td>6</td>\
												<td>Certificate protocol specifications</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event033009">Summary</a></td>\
											</tr><tr>\
												<td>Microsoft Active Directory Protocols 2009 Plugfest</td>\
												<td>January 26-30, 2009</td>\
												<td>8</td>\
												<td>Active Directory protocol specifications</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn767917#tile=event012609">Summary and photos</a></td>\
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

	});

});