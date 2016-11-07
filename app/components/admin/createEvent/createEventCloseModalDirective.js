'use strict';

const jQuery = require('jquery');

const createEventCloseModalDirective = (app) => {
	app.directive('createEventCloseModalDirective', ['$timeout', function($timeout) {
		const createEventCloseModalDirectiveObj = {
			restrict: 'A',
			link: (scope, elem, attrs) => {
				//set speakers to newSpeakers when modal window is closed
				elem.on('hide.bs.modal', (e) => {
					scope.$parent.newEvent.speakers = scope.$parent.newSpeakers;
				});

			}
			
		}

		return createEventCloseModalDirectiveObj;
	}])
}

module.exports = createEventCloseModalDirective;