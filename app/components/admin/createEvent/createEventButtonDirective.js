'use strict';

const jQuery = require('jquery');
import * as customFunctions from '../../shared/methods/common-functions.js';

const createEventButtonDirective = (app) => {
	app.directive('createEventButtonDirective', [ () => {
		const createEventButtonDirectiveObj = {
			restrict: 'A',
			link: ($scope, $elem, attrs) => {
				let $buttons = $elem.find('button');
				customFunctions.changeWidth($buttons);
			}
			
		}

		return createEventButtonDirectiveObj;
	}])
}

module.exports = createEventButtonDirective;