'use strict';

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var chaihttp = require('chai-http');


chai.use(chaihttp);

require('../server.js');

describe('Test /showfullteam route', function () {
	it('should load all MS speakers from /showfullteam', function (done) {
		chai.request('/')
		.get('/showfullteam')
		.end(function (err, res) {
			// console.log(' ::::::   ', process.env);
			expect(err).to.eql(null);
			for (var i = 0; i < res.body.length; i++) {
				expect(res.body[i]).to.include.keys('firstName', 'lastName', 'email', 'newsletterSubscription', 'speakerDescription', 'msTeamMember', 'msTeamTitle', 'showOnHomePage', 'headShot', 'company', 'address', 'country', 'interestId', 'allowNotifications', 'allowPersonalInfoSharing');
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
				if (res.body[i].allowNotifications) {
					assert.typeOf(res.body[i].allowNotifications, 'boolean');
				}
				if (res.body[i].interestId) {
					assert.isNumber(res.body[i].interestId);
				}
				expect(typeof res.body[i].speakerDescription).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].headShot).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].company).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].address).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].country).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
				expect(typeof res.body[i].allowPersonalInfoSharing).to.be.a('string') || expect(typeof res.body[i].firstName).to.be.a('null');
			};
			done();
		});
	});
});
