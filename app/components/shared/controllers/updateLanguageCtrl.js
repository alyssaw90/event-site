'use strict';

const jQuery = require('jquery');

const updateLanguageCtrl = function(app){

	app.controller('updateLanguageCtrl', ['$rootScope', ($rootScope) => {
		$rootScope.lang = 'en';
		$rootScope.$on('$routeChangeStart', () => {
			$rootScope.lang = 'en';
		})
	}]);
};

module.exports = updateLanguageCtrl;