'use strict';
import * as customFunctions from '../../shared/methods/common-functions.js';
const jQuery = require('jquery');

const editEventDirective = (app) => {
	app.directive('editEventDirective', [ function() {
		let widestBlock = 0;
		
		const editEventDirectiveObj = {
			restrict: 'A',
			link: ($scope, $elem, attrs, controller, transcludeFn) => {
				$scope.$watch(() => {
					if ($elem.width() > widestBlock) {
						widestBlock = $elem.width();
						$scope.buttonStyle.width = $elem.width() + ' px';
					} else {
						$elem.width(widestBlock);
					}
					
				})

			}
		}
		return editEventDirectiveObj;
	}])
};

module.exports = editEventDirective;