'use strict';

var Sql = require('sequelize');
var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
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
		question: 'Name',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Company',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Role',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Phone Number',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Email Address',
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Are you a developer?',
		options: 'yes, no'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Are you familiar with the MSDN Open Specifications documentation?',
		options: 'yes, no'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Do you have experience building Web API/client applications?',
		options: 'yes, no'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Have you implemented an OData service?',
		options: 'yes, no'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Have you used any OData libraries?',
		options: 'yes, no'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'What do you want to learn most about OData? ',
		options: 'Introduction to OData, Usage scenarios, OData libraries, OData benefits for a non-developer, Implementing OData APIs and client apps as a developer'

	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which of the following technologies are you familiar with? (Indicate all that apply)',
		options: 'Office Add-ins, O365 APIs , OData & REST, Office Protocols'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which developer technologies are of most interest to you and your company? (Indicate all that apply)',
		options: 'Office Client Protocols, SharePoint Protocols , Exchange Protocols , OData & REST, O365 APIs, Office Add-ins'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which implementation scenarios are of greatest interest to you and your organization? (Indicate all that apply)',
		options: 'Building a client application that interoperates with a Microsoft server or service, Building a server application that interoperates with a Microsoft client, Analyzing network traffic, Learning the latest Office developer technologies'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Are Office File Formats of interest to you?',
		options: 'yes, no'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'If “yes,” please specify which formats you are most interested in:',
		options: 'Office Open XML (.docx, .xlsx, .pptx), Open Document Format (.odt, .ods, .odp), Office Binary File Formats (.doc, .xls, .ppt), Other'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Do you use the Open XML SDK to build documents? ',
		options: 'yes, no'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'If “yes,” please specify: '
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which of the following messaging protocols are you interested in? (Indicate all that apply)',
		options: 'Exchange ActiveSync (EAS), MAPI , MAPI/HTTP, Exchange Web Services (EWS), REST'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Which of the following Office Protocols interest you? (Check all that apply)',
		options: 'MS-WOPI (Office Online), MS-FSSHTTP (File synchronization over HTTP, co-authoring), SharePoint Web Services , Other'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Why are you attending this event? ',
		options: 'To learn more about the developer technologies available from Microsoft Office, To understand how Microsoft’s developer technologies will benefit my organization , To receive answers to questions or issues I have on an existing project, Other'
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Have you attended a Microsoft Interoperability event before? (1d398201-5cfe-4b39-87f8-75783c22789b)',
		options: 'yes, no'
	})
})