'use strict'

$(document).ready(function () {

	var $calendar = $('#calendar');

	$( "#2008_events" ).click(function () {


		var schedule = '<table cellspacing="0" cellpadding="0">\
											<thead><tr>\
												<th>Name</th>\
												<th>Date</th>\
												<th>Number of Attendees</th>\
												<th>Technical Topics</th>\
												<th>Related Materials</th>\
										</tr></thead>\
											<tbody><tr>\
												<td>DII Workshop on Translators – Brussels, Belgium</td>\
												<td>December 2, 2008</td>\
												<td>11</td>\
												<td>ODF/OXML/Legacy translators, Open XML/ODF implementation and related topics</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event120208">Summary and downloads</a></td>\
											</tr><tr>\
												<td>DII Workshop – Redmond, WA</td>\
												<td>October 23-24, 2008</td>\
												<td>13</td>\
												<td>Document format test library, validation tools, Open XML interoperability and related topics</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event102308">Summary and downloads</a></td>\
											</tr><tr>\
												<td>DII Workshop by wipse (Windows + Services Consortium) – Tokyo, Japan</td>\
												<td>July 30, 2008</td>\
												<td> - </td>\
												<td>Open XML standard interoperability verification lab on multiple-companies products</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event073008">Summary</a></td>\
											</tr><tr>\
												<td>DII Workshop on ODF 1.1 – Redmond, WA</td>\
												<td>July 30, 2008</td>\
												<td>13</td>\
												<td>ODF and Office 2007 SP2 interoperability and related topics</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event073108">Summary</a></td>\
											</tr><tr>\
												<td>DII Workshop on Accessibility – Munich, Germany</td>\
												<td>June 10, 2008</td>\
												<td> - </td>\
												<td>Open XML and DAISY interoperability, high fidelity roaming scenarios, OXML SDK, and related topics</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event061008">Summary and video</a></td>\
											</tr><tr>\
												<td>DII Workshop on Open XML / UOF – Beijing, China</td>\
												<td>March 29, 2008</td>\
												<td>100</td>\
												<td>Open XML and UOF interoperability and related topics</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event032908">Summary</a></td>\
											</tr><tr>\
												<td>DII Workshop on Translation Tools – Seoul, Korea</td>\
												<td>March 12, 2008</td>\
												<td> - </td>\
												<td>Open XML, DAISY and ODF translation tool showcase , Open XML PowerShell tools available at <a href="http://www.codeplex.com/PowerTools">http://www.codeplex.com/PowerTools</a></td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event031208">Summary and video</a></td>\
											</tr><tr>\
												<td>DII Workshop at the Microsoft and Novell Interoperability Lab – Cambridge, MA</td>\
												<td>March 5, 2008</td>\
												<td> - </td>\
												<td>Document Interoperability technical lab testing scenarios and tool development</td>\
												<td><a href="https://msdn.microsoft.com/openspecifications/dn786371#tile=event030508">Summary and blog</a></td>\
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