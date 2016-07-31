'use strict';

require('angular/angular');
require('angular-route');

// declare a module
const eventsApp = angular.module('eventsApp', ['ngRoute']);

require('./homepage/homepageDirective.build.js')(eventsApp);

eventsApp
.config(['$routeProvider', function ($routeProvider) {
	/* Configuration is where you configure providers ( not instances) */
	console.log("Configuration hook")
	$routeProvider
	.when('/', {
		templateUrl: '/app/components/homepage/homepage.html'
	});
}])
.run(function () {
	/* Run is when the app gets kicked off */
	console.log("Run hook");
})