'use strict';

const EventsCtrl = (app) => {
	app.controller('EventsCtrl', ['$scope', function($scope) {
		console.log('path:      ', window.location.pathname);
	}])
}

module.exports = EventsCtrl;