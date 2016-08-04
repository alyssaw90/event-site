'use strict';

const PastEventsCtrl = (app) => {
	app.controller('PastEventsCtrl', ['$scope', function($scope) {
		$scope.pastEvents = [
			{
				year: 2016,
				calendarHtml: `<table cellspacing="0" cellpadding="0" id="2016PastEvents" tabindex="0">
                      <caption>Past plugfests and events from 2008</caption>
                          <thead>
                          <tr>
                           <th>Name</th>
                           <th>Date</th>
                           <th>Location</th>
                           <th>Technical Topics</th>
                           <th>Related Materials</th>
                        </tr>
                         </thead>
                      <tbody>
                        <tr data-eventendtime="June 24, 2016, 23:00">
                          <td><a href="/redmond2016">Redmond Protocol Plugfest & Windows Interoperability (IO) Lab</a></td>
                          <td>June 13 - 24, 2016</td>
                          <td>Redmond, WA</td>
                          <td>Microsoft Windows Protocol, Interoperability within Microsoft Office, Exchange, SharePoint, Windows and SQL Server. Office, SharePoint, & Exchange Protocol Testing</td>
                          <td><a href="/redmond2016">Event Page</a></td>
                        </tr>
                        <tr>
                          <td><a href="/taipei2016">DevDays Asia 2016 @ Taipei</a></td>
                          <td>April 19 - 21, 2016</td>
                          <td>Taipei, Taiwan</td>
                          <td>Office Developer Opportunity, Office Add-ins and APIs, Machine Learning, Big Data Analytics, Open Specifications, Hackathon</td>
                          <td><a href="/shanghai2015">Event Page</a></td>
                        </tr>
                        <tr>
                          <td><a href="/paris2016">Extend Conference</a></td>
                          <td>May 12, 2016</td>
                          <td>Paris, France</td>
                          <td>Office Developer Opportunity, Office Add-ins and APIs, Machine Learning, Big Data Analytics, Open Specifications</td>
                          <td><a href="/paris2016">Event Page</a></td>
                        </tr>
                      </tbody>
                    </table>`
                  },
      {
      	year: 2015,
      	calendarHtml: `<table id="2015PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
											<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical Topics</th>
												<th>Related Materials</th>
											</tr></thead>
											<tbody><tr>
												<td><a href="/shanghai2015">Shanghai Interop Dev Days 2015</a></td>
												<td>October 21 - 22, 2015</td>
												<td>Shanghai, China</td>
												<td>Office Developer Opportunity, Data Platform, OData, Open Specifications, Office Add-ins + APIs</td>
												<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interop-Dev-Days">Videos</a>, <a href="/shanghai2015">Event Page</a></td>
											</tr><tr>
												<td>Redmond Interoperability Protocols Plugfest 2015</td>
												<td>June 22-26, 2015</td>
												<td>Redmond, WA</td>
												<td>MailSim, Message Analyzer, FSSHTTP, O365 Developer Experience, OData, Exchange REST APIs, Office Parsers, Skype for Business Protocols, and Exchange ActiveSync.</td>
												<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2015">Videos</a></td>
											</tr><tr>
												<td>sambaXP 2015</td>
												<td>May 19-22, 2015</td>
												<td>Göttingen, Germany</td>
												<td> - </td>
												<td><a href="http://www.sambaxp.org/">Recordings and slides</a></td>
											</tr><tr>
												<td>Protocols Plugfest Europe 2015</td>
												<td>May 12-14, 2015</td>
												<td>Zaragoza, Spain</td>
												<td> - </td>
												<td><a href="http://www.protocolsplugfest.com/europe/program/">Videos</a></td>
											</tr><tr>
												<td>Taipei Interoperability Plugfest and Server TechFest 2015</td>
												<td>March 24-26, 2015</td>
												<td>Taipei, Taiwan</td>
												<td>Office 365 authentication, Microsoft Cloud Foundation, Office Online, Office BI Power Tools, OData, Message Analyzer, Lync, and ActiveSync.</td>
												<td><a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Plugfest-and-Server-TechFest-2015">Videos</a></td>
											</tr><tr>
												<td>Beijing Interop Seminar 2015</td>
												<td>March 16-17, 2015</td>
												<td>Beijing, China</td>
												<td>Office File Formats and the latest in Office developer and product technology.</td>
												<td><a href="http://connect.microsoft.com/site216/Downloads/DownloadDetails.aspx?DownloadID=57585">Presentation handouts</a></td>
											</tr></tbody>
											</table>`
										},
      {
      	year: 2014,
      	calendarHtml: `<table id="2014PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
												<thead><tr>
													<th>Name</th>
													<th>Date</th>
													<th>Location</th>
													<th>Technical topics</th>
													<th>Related Materials</th>
												</tr></thead>
												<tbody><tr>
													<td>RDP Protocols Plugfest 2014</td>
													<td>October 28-30, 2014</td>
													<td>Redmond, WA</td>
													<td>Protocol test suites and tools overviews, RDP documentation, Windows Multipoint Server, and RDP USB redirection</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/RDP-Protocols-Plugfest-2014">Videos</a></td>
												</tr><tr>
													<td>SDC (SNIA)</td>
													<td>September 15-19, 2014</td>
													<td>Santa Clara, CA</td>
													<td> - </td>
													<td> - </td>
												</tr><tr>
													<td>Redmond Interoperability Protocols Plugfest 2014</td>
													<td>June 16-20, 2014</td>
													<td>Redmond, WA</td>
													<td>Windows File Sharing, SharePoint, Exchange, and SQL protocols</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2014">Videos</a></td>
												</tr><tr>
													<td>Beijing Interoperability Event</td>
													<td>April 1-2, 2014</td>
													<td>Beijing, China</td>
													<td> - </td>
													<td> - </td>
												</tr><tr>
													<td>Taipei Interoperability Protocols Plugfest 2014</td>
													<td>March 25-27, 2014</td>
													<td>Taipei, Taiwan</td>
													<td>Key interoperability topics, such as Bring your own device (BYOD), OAuth, OData, Remote Desktop Protocol (RemoteFX/RDP), Office File IO, and Exchange Email clients</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Protocols-Plugfest-2014">Videos</a></td>
												</tr></tbody>
											</table>`
										},
      {
      	year: 2013,
      	calendarHtml: `<table id="2013PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
													<thead><tr>
													<th>Name</th>
													<th>Date</th>
													<th>Location</th>
													<th>Technical topics</th>
													<th>Related Materials</th>
												</tr></thead>
												<tbody><tr>
													<td>Shanghai Interoperability Protocols Seminar</td>
													<td>December 10-12, 2013</td>
													<td>Shanghai, China</td>
													<td> - </td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Shanghai-Interoperability-Protocols-Seminar-2013">Videos</a></td>
												</tr><tr>
													<td>SNIA Storage Developers conference and Plugfest 2013</td>
													<td>September 16-19, 2013</td>
													<td>Santa Clara, CA</td>
													<td>SMB, SMB2 and SMB3 file sharing protocols</td>
													<td><a href="http://www.snia.org/events/storage-developer2013/presentation">Website</a></td>
												</tr><tr>
													<td>Redmond Interoperability Protocols Plugfest 2013</td>
													<td>June 24-28, 2013</td>
													<td>Redmond, WA</td>
													<td>Exchange RPC and Web Services and Office SharePoint Specifications; Windows Identity; Active Directory, File Sharing and Authentication Specifications; SQL and OData Protocols</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Redmond-Interoperability-Protocols-Plugfest-2013">Videos</a></td>
												</tr><tr>
													<td>Taipei Interoperability Protocols Plugfest</td>
													<td>April 23-25, 2013</td>
													<td>Taipei, Taiwan</td>
													<td>Windows RDP, Exchange and SharePoint Protocols</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Interoperability-Protocols-Plugfest-2013">Videos</a></td>
												</tr></tbody>
											</table>`
										},
      {
      	year: 2012,
      	calendarHtml: `<table id="2012PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
												<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical topics</th>
												<th>Related Materials</th>
											</tr></thead>
											<tbody><tr>
												<td>Brussels Interoperability Protocols Plugfest</td>
												<td>November 13-14, 2012</td>
												<td>Brussels, Belgium</td>
												<td>Windows Identity, SharePoint, Exchange, and SQL Protocols</td>
												<td> - </td>
											</tr><tr>
												<td>SNIA Storage Developers conference and Plugfest 2012</td>
												<td>September 17-20, 2012</td>
												<td>Santa Clara, CA</td>
												<td>SMB, SMB2, and SMB3 file sharing protocols</td>
												<td><a href="http://www.snia.org/events/storage-developer2012/presentations12">Website</a></td>
											</tr><tr>
												<td>OSCON.com 2012</td>
												<td>July 2012</td>
												<td>Portland, OR</td>
												<td> - </td>
												<td> - </td>
											</tr><tr>
												<td>Windows File Sharing Protocols Plugfest</td>
												<td>June 18-22, 2012</td>
												<td>Redmond, WA</td>
												<td> - </td>
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-File-Sharing-Protocols-Plugfest-2012">Videos</a></td>
											</tr><tr>
												<td>Interop.com 2012</td>
												<td>May 2012</td>
												<td>Las Vegas, NV</td>
												<td> - </td>
												<td><a href="http://www.interop.com/lasvegas/">Website</a></td>
											</tr><tr>
												<td>sambaXP 2012</td>
												<td>May 2012</td>
												<td>Göttingen, Germany</td>
												<td> - </td>
												<td><a href="http://sambaxp.org/">Website</a></td>
											</tr><tr>
												<td>Taipei Communication Protocols Plugfest</td>
												<td>May 2-4, 2012</td>
												<td>Taipei, Taiwan</td>
												<td>Windows RDP, Exchange and SharPoint Protocols</td>
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Taipei-Communication-Protocols-Plugfest-2012">Videos</a></td>
											</tr><tr>
												<td>Windows Identity and Exchange Protocols Plugfest</td>
												<td>April 16-20, 2012</td>
												<td>Redmond, WA</td>
												<td>Exchange RPC and Web Services Specifications; Windows Identity; Active Directory and Authentication Specifications</td>
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-Identity-and-Exchange-Protocols-Plugfest-2012">Videos</a></td>
											</tr><tr>
												<td>RemoteFX Conference</td>
												<td>April 10-11, 2012</td>
												<td>Redmond, WA</td>
												<td> - </td>
												<td><a href="">Videos</a></td>
											</tr><tr>
												<td>OData Interop Meetup</td>
												<td>March 19-20, 2012</td>
												<td>Redmond, WA</td>
												<td>The Evolution of OData, OData v3, Partner Presentations, Implementing OData, and Open Discussion Session</td>
												<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Odata-Meetup-2012">Videos</a></td>
											</tr></tbody>
										</table>`
									},
      {
      	year: 2011,
      	calendarHtml: `<table id="2011PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
											<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical Topics</th>
												<th>Related Materials</th>
											</tr></thead>
											<tbody><tr>
													<td>Kerberos.org Interop</td>
													<td>October 25-28, 2011</td>
													<td>Cambridge, MA</td>
													<td>Kerberos authentication protocols</td>
													<td><a href="http://www.kerberos.org/events/2011conf-interop/2011slides/2011slides.html">Website</a></td>
												</tr><tr>
													<td>SNIA.org 2011 Storage Developer Conference</td>
													<td>September 19-22, 2011</td>
													<td>Santa Clara, CA</td>
													<td>CIFS, SMB, and SMB2 file sharing protocol specifications</td>
													<td><a href="http://www.snia.org/events/storage-developer2011">Website</a></td>
												</tr><tr>
													<td>Windows File Sharing and SharePoint Protocols Plugfest</td>
													<td>June 20-24, 2011</td>
													<td>Redmond, WA</td>
													<td>SharePoint File Operations Protocols and SharePoint Front End Protocols; SMB, SMB2 and other Windows File Sharing protocols</td>
													<td><a href="http://channel9.msdn.com/Events/Open-Specifications-Plugfests/Windows-File-Sharing-and-SharePoint-Protocols-Plugfest-2011">Videos</a></td>
												</tr><tr>
													<td>Exchange Server Select RPC</td>
													<td>January 24-28, 2011</td>
													<td> - </td>
													<td>Exchange Server RPC, ROPS Fast Transfer, and Incremental Change Synchronization protocols</td>
													<td><a href="http://channel9.msdn.com/Series/Exchange-RPC-Protocols-Plugfest-January-2011">Videos</a></td>
												</tr><tr>
													<td>Windows Active Directory Protocols Plugfest</td>
													<td>January 2011</td>
													<td> - </td>
													<td>Active Directory protocols</td>
													<td><a href="http://channel9.msdn.com/Series/Windows-AD-Protocols-Plugfest-2011">Videos</a></td>
												</tr></tbody>
											</table>`
										},
      {
      	year: 2010,
      	calendarHtml: `<table id="2010PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
												<thead><tr>
												<th>Name</th>
												<th>Date</th>
												<th>Location</th>
												<th>Technical Topics</th>
												<th>Related Materials</th>
										</tr></thead>
											<tbody><tr>
												<td>Binary File Format Plugfest</td>
												<td>October 19-20, 2010</td>
												<td> - </td>
												<td>Word, Excel, Outlook, and PowerPoint</td>
												<td> - </td>
											</tr><tr>
												<td>SNIA.org 2010 Storage Developer Conference</td>
												<td>September 20-23, 2010</td>
												<td>Santa Clara, CA</td>
												<td>CIFS, SMB, and SMB2 file sharing protocol specifications</td>
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event092010">Summary</a></td>
											</tr><tr>
												<td>Exchange Protocols Overview Event</td>
												<td>September 21-22, 2010</td>
												<td>24</td>
												<td>Exchange Protocol specifications, including Exchange RPC, ROPS, Fast Transfer, Incremental Change Synchronization, Protocol Object Model, Notifications, Exchange Web Services, Exchange Active Sync, and other topics</td>
												<td> - </td>
											</tr><tr>
												<td>SharePoint File Operations Protocols Plugfest</td>
												<td>June 15-16, 2010</td>
												<td> - </td>
												<td>SharePoint File Operations Protocols and SharePoint Front End Protocols</td>
												<td> - </td>
											</tr><tr>
												<td>DII Workshop on XAdES</td>
												<td>June 8, 2010</td>
												<td> - </td>
												<td>XAdES digital signature interoperability and related topics</td>
												<td> - </td>
											</tr><tr>
												<td>Microsoft File Sharing Protocols 2010 Plugfest</td>
												<td>May 17-20, 2010</td>
												<td> - </td>
												<td>SMB and SMB2 and other file sharing protocol specifications</td>
												<td> - </td>
											</tr><tr>
												<td>Microsoft Certificate DirectAccess Protocols 2010 Plugfest</td>
												<td>April 12-15, 2010</td>
												<td> - </td>
												<td>Certificate and IPSec protocol specifications</td>
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event041210">Summary</a></td>
											</tr><tr>
												<td>DII Workshop</td>
												<td>February 25, 2010</td>
												<td>Beijing, China</td>
												<td>Document interoperability and fidelity and related topics - 3rd annual event</td>
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event022510">Summary, video, and photos</a></td>
											</tr><tr>
												<td>Microsoft Active Directory Protocols 2010 Plugfest</td>
												<td>January 18-21, 2010</td>
												<td> - </td>
												<td>Active Directory protocol specifications</td>
												<td><a href="https://msdn.microsoft.com/openspecifications/dn768081#tile=event011810">Summary</a></td>
											</tr></tbody>
										</table>`
									},
      {
      	year: 2009,
      	calendarHtml: `<table id="2009PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
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
											</table>`
										},
											{
												year: 2008,
												calendarHtml: `<table id="2008PastEvents" tabindex="0" cellspacing="0" cellpadding="0">
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
											</table>` 
										}
		];

		//function to show and hide past event tables on past events page
		$scope.showCalendarOfPastEvents = (calendarHtml, divClicked, calendarDiv, keyCode) => {
			if (keyCode === 1 || 13) {
			  if (angular.element(divClicked).hasClass('selected-year')) {
			    angular.element(calendarDiv).empty();
			  } else {
			    angular.element(calendarDiv).empty();
			    angular.element(calendarDiv).append(calendarHtml);
			  }
			  angular.element(divClicked).siblings().removeClass('selected-year');
			  angular.element(divClicked).toggleClass('selected-year');
			  angular.element(calendarDiv).focus();
			};
				
			}
		  

	}])
}

module.exports = PastEventsCtrl;