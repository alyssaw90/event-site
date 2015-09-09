'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-simple-mocha');

	// initialize Grunt
	grunt.initConfig({
		mocha: {
			// tell mocha where the test file is
			src: ['tests/test_entry.js'],
			options: {
				node: true,
				globals: {
					describe: true,
					it: true,
					before: true,
					after: true,
					beforeEach: true,
					afterEach: true,
					res: true,
					expect: true
				}
			}
		},

		// create simplemocha task
		simplemocha: {
			dev: {
				src: ['tests/test_entry.js']
			}
		}
	});

	// register mocha test task
	grunt.registerTask('test', ['simplemocha:dev']);
	grunt.registerTask('default', ['test'])
};