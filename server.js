'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var time = new Date();

app.use(express.static(__dirname + '/'));
app.use('/map', express.static(__dirname + '/views/world-map.html'));
app.use('/find-an-event', express.static(__dirname + '/views/find-an-event.html'));
app.use('/past-events', express.static(__dirname + '/views/past-events.html'));
app.use('/media', express.static(__dirname + '/views/media.html'));
app.use('/latest-news', express.static(__dirname + '/views/latest-news.html'));
app.use('/faq', express.static(__dirname + '/views/faq.html'));
app.use('/meet-the-team', express.static(__dirname + '/views/meet-the-team.html'));
app.use('/contact', express.static(__dirname + '/views/contact.html'));
app.use('/about', express.static(__dirname + '/views/about.html'));
app.use('/santa-clara-2015', express.static(__dirname + '/views/events/santa-clara-2015.html'));

app.listen(port, function () {
	console.log('server started on port ' + port + ' at ' + time);
});