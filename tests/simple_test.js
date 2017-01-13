'use strict';

var chai = require('chai');
var expect = chai.expect;
// Sample test
describe('Test that tests run', function (done) {
	it('should run a test', function (done) {
		expect(true).to.eql(true);
		done();
	});
});