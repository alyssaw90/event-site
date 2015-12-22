'use strict';

var Sql = require('sequelize');
/*var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql('InteropEventsDBTest', 'EventAdmin@interopeventstestserver', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});

var SurveyQuestion = module.exports = sql.define('SurveyQuestion', {
	eventId: Sql.INTEGER,
	question: Sql.TEXT,
	options: Sql.TEXT
})

SurveyQuestion.sync({force: true})
.then(function () {
	return SurveyQuestion.create({
		eventId: 1,
		question: 'What does it all mean?',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 1,
		question: 'What is 2 + 2?',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name &#21517;&#23383;',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Company &#20844;&#21496;',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Role &#32844;&#21153;',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Phone Number &#30005;&#35805;&#21495;&#30721;',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Email Address &#30005;&#23376;&#37038;&#20214;&#22320;&#22336;',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Are you a developer? &#24744;&#26159;&#24320;&#21457;&#32773;&#21527;',
		options: 'yes &#26159;, no &#20854;&#20182;（&#35831;&#35828;&#26126;）'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Are you familiar with the MSDN Open Specifications documentation? &#24744;&#23545;MSDN&#24320;&#25918;&#25991;&#26723;&#29087;&#24713;&#21527;',
		options: 'yes &#26159;, no &#21542;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Do you have experience building Web API/client applications? &#24744;&#26377;&#24320;&#21457;Web API/&#23458;&#25143;&#31471;&#30340;&#32463;&#39564;&#21527;?',
		options: 'yes &#26159;, no &#21542;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Have you implemented an OData service? &#24744;&#23454;&#29616;&#36807;OData&#26381;&#21153;&#21527;?',
		options: 'yes &#26159;, no &#21542;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Have you used any OData libraries? &#24744;&#29992;&#36807;OData&#20989;&#25968;&#24211;&#21527;',
		options: 'yes &#26159;, no &#21542;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'What do you want to learn most about OData? &#24744;&#26368;&#24819;&#20102;&#35299;OData&#21738;&#20123;&#26041;&#38754;?',
		options: 'Introduction to OData Odata&#20171;&#32461;, Usage scenarios &#29992;&#25143;&#22330;&#26223;, OData libraries OData&#20989;&#25968;&#24211;, OData benefits for a non-developer Odata&#23545;&#38750;&#24320;&#21457;&#32773;&#30340;&#30410;&#22788;, Implementing OData APIs and client apps as a developer &#20316;&#20026;&#24320;&#21457;&#20154;&#21592;&#23454;&#29616;OData API&#21644;&#23458;&#25143;&#31471;&#31243;&#24207;'

	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which of the following technologies are you familiar with? (Indicate all that apply)  &#24744;&#23545;&#19968;&#19979;&#21738;&#20123;&#25216;&#26415;&#27604;&#36739;&#29087;&#24713;&#65311;&#65288;&#21487;&#22810;&#36873;&#65289;',
		options: 'Office Add-ins Office &#25554;&#20214;, O365 APIs , OData & REST, Office Protocols Office &#21327;&#35758;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which developer technologies are of most interest to you and your company? (Indicate all that apply) &#24744;&#21644;&#24744;&#30340;&#20844;&#21496;&#23545;&#21738;&#20123;&#24320;&#21457;&#25216;&#26415;&#26368;&#24863;&#20852;&#36259;&#65311;&#65288;&#21487;&#22810;&#36873;&#65289;',
		options: 'Office Client Protocols Office &#23458;&#25143;&#31471;&#21327;&#35758;, SharePoint Protocols SharePoint &#21327;&#35758;, Exchange Protocols Exchange &#21327;&#35758;, OData & REST, O365 APIs, Office Add-ins Office &#25554;&#20214;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which implementation scenarios are of greatest interest to you and your organization? (Indicate all that apply) &#24744;&#21644;&#24744;&#30340;&#20844;&#21496;&#23545;&#21738;&#20123;&#23454;&#29616;&#22330;&#26223;&#23545;&#24863;&#20852;&#36259;&#65311;&#65288;&#21487;&#22810;&#36873;&#65289;',
		options: 'Building a client application that interoperates with a Microsoft server or service &#24320;&#21457;&#19982;&#24494;&#36719;&#30340;&#26381;&#21153;&#22120;&#25110;&#32773;&#26381;&#21153;&#20132;&#20114;&#30340;&#23458;&#25143;&#31471;, Building a server application that interoperates with a Microsoft client &#24320;&#21457;&#19982;&#24494;&#36719;&#23458;&#25143;&#31471;&#20132;&#20114;&#30340;&#26381;&#21153;&#22120;, Analyzing network traffic &#20998;&#26512;&#32593;&#32476;&#28040;&#24687;, Learning the latest Office developer technologies &#20102;&#35299;&#26368;&#26032;Office&#24320;&#21457;&#25216;&#26415;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Are Office File Formats of interest to you? &#24744;&#23545;Office&#25991;&#26723;&#26684;&#24335;&#24863;&#20852;&#36259;&#21527;&#65311;',
		options: 'yes &#26159;, no &#21542;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'If “yes,” please specify which formats you are most interested in: &#22914;&#26524;&#8220;&#26159;&#8221;&#65292;&#35831;&#25351;&#26126;&#23545;&#37027;&#31181;&#26684;&#24335;&#26368;&#24863;&#20852;&#36259;&#65306;',
		options: 'Office Open XML (.docx, .xlsx, .pptx), Open Document Format (.odt, .ods, .odp) Open &#25991;&#26723;&#26684;&#24335; (.odt, .ods, .odp), Office Binary File Formats (.doc, .xls, .ppt) Office &#20108;&#36827;&#21046;&#25991;&#26723;&#26684;&#24335; (.doc, .xls, .ppt), Other &#20854;&#20182;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Do you use the Open XML SDK to build documents? &#24744;&#29992;Open XML SDK&#29983;&#25104;&#25991;&#26723;&#21527;&#65311;',
		options: 'yes &#26159;, no &#21542;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'If “yes,” please specify: &#22914;&#26524;&#8220;&#26159;&#8221;&#65292;&#35831;&#25351;&#26126;&#65306;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which of the following messaging protocols are you interested in? (Indicate all that apply) &#24744;&#23545;&#20197;&#19979;&#21738;&#20123;&#21327;&#35758;&#24863;&#20852;&#36259;&#65311;&#65288;&#21487;&#22810;&#36873;&#65289;',
		options: 'Exchange ActiveSync (EAS), MAPI , MAPI/HTTP, Exchange Web Services (EWS), REST'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which of the following Office Protocols interest you? (Check all that apply) &#24744;&#23545;&#20197;&#19979;&#21738;&#20123;Office&#21327;&#35758;&#24863;&#20852;&#36259;&#65311;&#65288;&#21487;&#22810;&#36873;&#65289;',
		options: 'MS-WOPI (Office Online), MS-FSSHTTP (File synchronization over HTTP, co-authoring), SharePoint Web Services , Other &#20854;&#20182;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Why are you attending this event? &#24744;&#21442;&#21152;&#36825;&#27425;&#22823;&#20250;&#30340;&#30446;&#30340;&#26159;&#20160;&#20040;&#65311;',
		options: 'To learn more about the developer technologies available from Microsoft Office &#26356;&#22810;&#22320;&#23398;&#20064;&#24494;&#36719;Office&#25552;&#20379;&#30340;&#24320;&#21457;&#25216;&#26415;, To understand how Microsoft’s developer technologies will benefit my organization &#8216; &#20102;&#35299;&#24494;&#36719;&#25216;&#26415;&#21487;&#20197;&#32473;&#25105;&#24102;&#26469;&#21738;&#20123;&#30410;&#22788;, To receive answers to questions or issues I have on an existing project &#23547;&#27714;&#24050;&#26377;&#39033;&#30446;&#38382;&#39064;&#25110;&#22256;&#38590;&#30340;&#31572;&#26696;, Other &#20854;&#20182;'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Have you attended a Microsoft Interoperability event before? (1d398201-5cfe-4b39-87f8-75783c22789b) &#24744;&#20043;&#21069;&#21442;&#21152;&#36807;&#24494;&#36719;&#20114;&#25805;&#20316;&#22823;&#20250;&#21527;&#65311;',
		options: 'yes &#26159;, no &#21542;'
	})
})