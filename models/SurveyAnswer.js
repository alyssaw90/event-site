'use strict';

var Sql = require('sequelize');
/*var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
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

var SurveyAnswer = module.exports = sql.define('SurveyAnswer', {
	surveyQuestionId: Sql.INTEGER,
  question: Sql.TEXT,
	answer: Sql.TEXT,
  options: Sql.TEXT
})

SurveyAnswer.sync({force: false})
/*.then(function () {
	return SurveyAnswer.create({
		surveyQuestionId: 1,
		answer: '',
    question: ''
	})
})*/