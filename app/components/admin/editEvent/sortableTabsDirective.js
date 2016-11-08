'use strict';
const jQuery = require('jquery');
const jQueryUi = require('jquery-ui');

const sortableTabsDirective = (app) => {
	app.directive('sortableTabsDirective', ['$timeout', ($timeout) => {
		let widestBlock = 0;
		
		const sortableTabsDirectiveObj = {
			restrict: 'A',
			replace: true,
			link: ($scope, $elem, attrs) => {
				
                $timeout( () => {
                    
                    $elem.find('tbody').sortable().disableSelection();
                });
				

			}
		}
		return sortableTabsDirectiveObj;
	}])
};

module.exports = sortableTabsDirective;