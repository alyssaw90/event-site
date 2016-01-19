'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');

chai.use(chaihttp);

require('../server.js');

describe('Test that server can load basic html pages', function () {
  //create task to test that server can load a basic web pages
  it('Should load homepage', function (done) {
    chai.request('localhost:3000')
    .get('/')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('Should load about page', function (done) {
    chai.request('localhost:3000')
    .get('/about')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('Should load past events page', function (done) {
    chai.request('localhost:3000')
    .get('/past-events')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('Should load meet the team page', function (done) {
    chai.request('localhost:3000')
    .get('/meet-the-team')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('Should load contact us page', function (done) {
    chai.request('localhost:3000')
    .get('/contactus')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('Should load faq page', function (done) {
    chai.request('localhost:3000')
    .get('/faq')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('Should load latest news page', function (done) {
    chai.request('localhost:3000')
    .get('/latest-news')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

});