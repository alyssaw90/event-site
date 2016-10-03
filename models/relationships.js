'use strict';

const models = require('./index');
const User = models.User;
const Speaker = models.Speaker;
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
			event.addSpeaker(1, {sortPosition: 1});
			event.addSpeaker(2, {sortPosition: 2});
			event.addSpeaker(8, {sortPosition: 3});
			event.addSpeaker(11, {sortPosition: 4});
			event.addSpeaker(15, {sortPosition: 5});
			event.addSpeaker(9, {sortPosition: 6});
			event.addSpeaker(12, {sortPosition: 7});
			event.addSpeaker(10, {sortPosition: 8});
			event.addSpeaker(6, {sortPosition: 9});
			event.addSpeaker(32, {sortPosition: 10});
			event.addSpeaker(33, {sortPosition: 11});
			event.addSpeaker(34, {sortPosition: 12});
			event.addSpeaker(35, {sortPosition: 13});
			event.addSpeaker(38, {sortPosition: 14});
			event.addSpeaker(26, {sortPosition: 15});
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
			event.addSpeaker(1, {sortPosition: 1});
			event.addSpeaker(2, {sortPosition: 2});
			event.addSpeaker(5, {sortPosition: 3});
			event.addSpeaker(10, {sortPosition: 4});
			event.addSpeaker(8, {sortPosition: 5});
			event.addSpeaker(11, {sortPosition: 6});
			event.addSpeaker(35, {sortPosition: 7});
			event.addSpeaker(36, {sortPosition: 8});
			event.addSpeaker(37, {sortPosition: 9});
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
			event.addSpeaker(1, {sortPosition: 1});
			event.addSpeaker(2, {sortPosition: 2});
			event.addSpeaker(3, {sortPosition: 3});
			event.addSpeaker(5, {sortPosition: 4});
			event.addSpeaker(9, {sortPosition: 5});
			event.addSpeaker(8, {sortPosition: 6});
			event.addSpeaker(11, {sortPosition: 7});
			event.addSpeaker(15, {sortPosition: 8});
			event.addSpeaker(12, {sortPosition: 9});
			event.addSpeaker(10, {sortPosition: 10});
			event.addSpeaker(21, {sortPosition: 11});
			event.addSpeaker(14, {sortPosition: 12});
			event.addSpeaker(18, {sortPosition: 13});
			event.addSpeaker(16, {sortPosition: 14});
			event.addSpeaker(39, {sortPosition: 15});
			event.addSpeaker(40, {sortPosition: 16});
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
			event.addSpeaker(1, {sortPosition: 1});
			event.addSpeaker(2, {sortPosition: 2});
			event.addSpeaker(13, {sortPosition: 3});
			event.addSpeaker(9, {sortPosition: 4});
			event.addSpeaker(8, {sortPosition: 5});
			event.addSpeaker(10, {sortPosition: 6});
			event.addSpeaker(6, {sortPosition: 7});
			event.addSpeaker(11, {sortPosition: 8});
			event.addSpeaker(35, {sortPosition: 9});
			event.addSpeaker(26, {sortPosition: 10});
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
			event.addSpeaker(6, {sortPosition: 1});
			event.addSpeaker(43, {sortPosition: 2});
			event.addSpeaker(1, {sortPosition: 3});
			event.addSpeaker(9, {sortPosition: 4});
			event.addSpeaker(8, {sortPosition: 5});
			event.addSpeaker(11, {sortPosition: 6});
			event.addSpeaker(15, {sortPosition: 7});
			event.addSpeaker(41, {sortPosition: 8});
			event.addSpeaker(42, {sortPosition: 9});
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
	  	event.addSpeaker(6, {sortPosition: 1});
			event.addSpeaker(43, {sortPosition: 2});
			event.addSpeaker(1, {sortPosition: 3});
			event.addSpeaker(9, {sortPosition: 4});
			event.addSpeaker(8, {sortPosition: 5});
			event.addSpeaker(11, {sortPosition: 6});
			event.addSpeaker(15, {sortPosition: 7});
			event.addSpeaker(41, {sortPosition: 8});
			event.addSpeaker(42, {sortPosition: 9});
	  })
	})
}