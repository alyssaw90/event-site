'use strict';

const models = require('./index');
const User = models.User;
const Contact = models.Contact;
const Event = models.Event;
const EventTab = models.EventTab;
const Slideshow = models.Slideshow;
const Slide = models.Slide;
const clc = require('cli-color');

module.exports = function() {
	models.sql.sync()
	.then(function() {
		return Slideshow.findOne({
			where: {
				id: 1
			}
		})
	})
	.then(function(slideshow) {
		models.sql.sync()
		.then(function() {
			slideshow.addSlide(1, {sortPosition: 1});
			slideshow.addSlide(2, {sortPosition: 2});
			slideshow.addSlide(3, {sortPosition: 3});
		})
	})
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
			event.setEventTabs([1,2,3,4,5,6,7]);
			event.addContact(1, {sortPosition: 1});
			event.addContact(2, {sortPosition: 2});
			event.addContact(8, {sortPosition: 3});
			event.addContact(11, {sortPosition: 4});
			event.addContact(15, {sortPosition: 5});
			event.addContact(9, {sortPosition: 6});
			event.addContact(12, {sortPosition: 7});
			event.addContact(10, {sortPosition: 8});
			event.addContact(6, {sortPosition: 9});
			event.addContact(32, {sortPosition: 10});
			event.addContact(33, {sortPosition: 11});
			event.addContact(34, {sortPosition: 12});
			event.addContact(35, {sortPosition: 13});
			event.addContact(38, {sortPosition: 14});
			event.addContact(26, {sortPosition: 15});
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
			event.setEventTabs([8,9,10,11,12,13]);
			event.addContact(1, {sortPosition: 1});
			event.addContact(2, {sortPosition: 2});
			event.addContact(5, {sortPosition: 3});
			event.addContact(10, {sortPosition: 4});
			event.addContact(8, {sortPosition: 5});
			event.addContact(11, {sortPosition: 6});
			event.addContact(35, {sortPosition: 7});
			event.addContact(36, {sortPosition: 8});
			event.addContact(37, {sortPosition: 9});
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
			event.setEventTabs([14,15,16,17,18]);
			event.addContact(1, {sortPosition: 1});
			event.addContact(2, {sortPosition: 2});
			event.addContact(3, {sortPosition: 3});
			event.addContact(5, {sortPosition: 4});
			event.addContact(9, {sortPosition: 5});
			event.addContact(8, {sortPosition: 6});
			event.addContact(11, {sortPosition: 7});
			event.addContact(15, {sortPosition: 8});
			event.addContact(12, {sortPosition: 9});
			event.addContact(10, {sortPosition: 10});
			event.addContact(21, {sortPosition: 11});
			event.addContact(14, {sortPosition: 12});
			event.addContact(18, {sortPosition: 13});
			event.addContact(16, {sortPosition: 14});
			event.addContact(39, {sortPosition: 15});
			event.addContact(40, {sortPosition: 16});
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
			event.setEventTabs([19,20,21,22,23]);
			event.addContact(1, {sortPosition: 1});
			event.addContact(2, {sortPosition: 2});
			event.addContact(13, {sortPosition: 3});
			event.addContact(9, {sortPosition: 4});
			event.addContact(8, {sortPosition: 5});
			event.addContact(10, {sortPosition: 6});
			event.addContact(6, {sortPosition: 7});
			event.addContact(11, {sortPosition: 8});
			event.addContact(35, {sortPosition: 9});
			event.addContact(26, {sortPosition: 10});
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
	  	event.setEventTabs([24]);
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
	  	event.setEventTabs([25]);
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
	  	event.setEventTabs([26]);
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
	  	event.setEventTabs([27]);
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 20
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setEventTabs([28, /*30, */32, 35, 34]);
			event.addContact(6, {sortPosition: 1});
			event.addContact(1, {sortPosition: 2});
			event.addContact(9, {sortPosition: 3});
			event.addContact(8, {sortPosition: 4});
			event.addContact(11, {sortPosition: 5});
			event.addContact(15, {sortPosition: 6});
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 21
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setEventTabs([29]);
	  })
	})
	.then(function() {
		return Event.findOne({
			where: {
				id: 22
			}
		})
	})
	.then(function(event) {
	  models.sql.sync()
	  .then(function() {
	  	event.setEventTabs([33, 34, 31, 36, 37]);
	  	event.addContact(6, {sortPosition: 1});
			event.addContact(1, {sortPosition: 2});
			event.addContact(9, {sortPosition: 3});
			event.addContact(8, {sortPosition: 4});
			event.addContact(11, {sortPosition: 5});
			event.addContact(15, {sortPosition: 6});
	  })
	})
}