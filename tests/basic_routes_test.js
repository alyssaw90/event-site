'use strict';

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var chaihttp = require('chai-http');
let port = process.env.PORT || 3000;

chai.use(chaihttp);

require('../server.js');
// Tests that make sure server can load basic HTML pages
describe('Test that server can load basic html pages', function () {
  //create task to test that server can load a basic web pages
  it('Should load homepage', function (done) {
    chai.request('localhost:' + port)
    .get('/')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
      done();
    });
  });

  it('Should load about page', function (done) {
    chai.request('localhost:' + port)
    .get('/about')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
      done();
    });
  });

  it('Should load past events page', function (done) {
    chai.request('localhost:' + port)
    .get('/past-events')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
      done();
    });
  });

  it('Should load meet the team page', function (done) {
    chai.request('localhost:' + port)
    .get('/meet-the-team')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
      done();
    });
  });

  it('Should load contact us page', function (done) {
    chai.request('localhost:' + port)
    .get('/contactus')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
      done();
    });
  });

  it('Should load faq page', function (done) {
    chai.request('localhost:' + port)
    .get('/faq')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
      done();
    });
  });

  it('Should load latest news page', function (done) {
    chai.request('localhost:' + port)
    .get('/latest-news')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
      done();
    });
  });

});
