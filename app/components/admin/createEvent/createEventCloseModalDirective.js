'use strict';

const jQuery = require('jquery');

const createEventCloseModalDirective = (app) => {
	app.directive('createEventCloseModalDirective', ['$timeout', function($timeout) {
		const createEventCloseModalDirectiveObj = {
			restrict: 'A',
			link: (scope, elem, attrs) => {
				console.log('scope :: ', scope, '    elem :: ', elem);
				//remove selected speakers if the user clicks outside the modal
				elem.on('hide.bs.modal', (e) => {
					console.log('event :: ', e);
					scope.$parent.newSpeakers = [];
				});

				//set speakers if they've already been selected
				elem.on('show.bs.modal', (e) => {
					scope.$parent.newSpeakers = scope.$parent.newEvent.speakers;
				})

			}
			
		}

		return createEventCloseModalDirectiveObj;
	}])
}

module.exports = createEventCloseModalDirective;