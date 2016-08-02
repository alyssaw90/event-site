'use strict';
import * as customFunctions from './../../es6/common-functions.build.js';
const jQuery = require('jquery');

const aboutDirecive = (app) => {
	app.directive('aboutDirecive', function() {
		const aboutDireciveDefinitionObject = {};
  return aboutDireciveDefinitionObject
	})
};

module.exports = aboutDirecive;