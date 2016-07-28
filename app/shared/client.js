'use strict';

require('angular/angular');

// declare a module
const eventsApp = angular.module('eventsApp', []);

// require(__dirname + 'footer/footerDirective.js')(eventsApp);

eventsApp.config([function () {
	/* Configuration is where you configure providers ( not instances) */
	console.log("Configuration hook")
}])
.run([function () {
	/* Run is when the app gets kicked off */
	console.log("Run hook");
	// angular.element('#beginningOfContent').hide();
}])