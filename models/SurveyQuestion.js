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
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})
.then(function () {
	return SurveyQuestion.create({
		eventId: 2,
		question: 'Name',
		options: ''
	})
})