'use strict';

const models = require('./index');
const User = models.User;
const Contact = models.Contact;
const Event = models.Event;
const EventTab = models.EventTab;
const SiteStyle = models.SiteStyle;
const clc = require('cli-color');

module.exports = function() {
	models.sql.sync()
	.then(function() {
		return Event.findOne({
			where: {
				id: 1
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setContacts([1,2,8,11,15,9,12,10,6,32,33,34,35,38,26]);
			event.setTabs([1,2,3,4,5,6,7]);
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 2
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setContacts([1,2,5,10,8,11,35,36,37]);
			event.setTabs([8,9,10,11,12,13]);
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 3
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setContacts([1,2,3,5,9,8,11,15,12,10,6,21,14,18,16,39,40]);
			event.setTabs([14,15,16,17,18]);
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 5
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setContacts([1,2,13,9,8,10,6,11,35,26]);
			event.setTabs([19,20,21,22,23]);
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 5
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setTabs([23]);
	  })
	})
  .then(function() {
		return Event.findOne({
			where: {
				id: 6
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setTabs([24]);
	  })
	})
  .then(function() {
		return Event.findOne({
			where: {
				id: 7
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setTabs([25]);
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 8
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setTabs([26]);
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 9
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setTabs([27]);
	  })
	})
}