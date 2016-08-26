'use strict';
import * as customFunctions from '../shared/methods/common-functions.js';
const jQuery = require('jquery');

const aboutDirecive = (app) => {
	app.directive('aboutDirecive', [function() {
		const aboutDireciveDefinitionObject = {};
  return aboutDireciveDefinitionObject
	}])
};

module.exports = aboutDirecive;