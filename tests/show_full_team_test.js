'use strict';

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var chaihttp = require('chai-http');
var clc = require('cli-color');
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


chai.use(chaihttp);

require('../server.js');

describe('Test /showfullteam route', function () {
	it('should load all MS contacts from /showfullteam', function (done) {
		chai.request('localhost:3000')
		.get('/showfullteam')
		.end(function (err, res) {
			expect(err).to.eql(null);
			for (var i = 0; i < res.body.length; i++) {
				expect(res.body[i]).to.include.keys('firstName', 'lastName', 'email', 'newsletterSubscription', 'contactDescription', 'msTeamMember', 'msTeamTitle', 'showOnHomePage', 'headShot', 'company', 'address', 'country', 'interestId', 'allowNotifications', 'allowPersonalInfoSharing');
				expect(res.body[i].msTeamMember).to.eql(true);
				expect(typeof res.body[i].firstName).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].lastName).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].email).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				// expect(typeof res.body[i].newsletterSubscription).to.be.a('boolean') || expect(typeof res.body[i].firstName).to.be.a('null');
				if (res.body[i].newsletterSubscription) {
					assert.typeOf(res.body[i].newsletterSubscription, 'boolean');
				}
				if (res.body[i].msTeamMember) {
					assert.typeOf(res.body[i].msTeamMember, 'boolean');
				}
				if (res.body[i].showOnHomePage) {
					assert.typeOf(res.body[i].showOnHomePage, 'boolean');
				}
				if (res.body[i].showOnHomePage) {
					assert.typeOf(res.body[i].showOnHomePage, 'boolean');
				}
				if (res.body[i].allowNotifications) {
					assert.typeOf(res.body[i].allowNotifications, 'boolean');
				}
				if (res.body[i].interestId) {
					assert.isNumber(res.body[i].interestId);
				}
				expect(typeof res.body[i].contactDescription).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].headShot).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].company).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].address).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].country).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].allowPersonalInfoSharing).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
			};
			done();
		})
	});
});
