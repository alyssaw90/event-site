'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');

	// initialize Grunt
	grunt.initConfig({
		    // create jshint task
    jshint: {
      dev: {
        // tell jshint what check
        src: ['Gruntfile.js', 'server.js', 'js/**/*.js', 'models/**/*.js', 'routes/**/*.js', '!build/**', '!tests/client/bundle.js', '!tests/karma_tests/bundle.js', '!js/imageMapResizer.min.js', '!js/kickstart.js', '!js/form-validator.js'],
        options: {
          node: true,
          globals: {
            describe: true,
            it: true,
            before: true,
            after: true,
            beforeEach: true,
            afterEach: true,
            res: true
          }
        }
      },

      mocha: {
        // tell mocha where test files are
        src: ['tests/**/*.js', '!tests/client/bundle.js', '!tests/karma_tests/bundle.js'],
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
      // jasmine: {
      //   src: ['tests/karma_tests/*test.js', 'app/js/*.js', 'app/js/*.js'],
      //   options: {
      //     node: true,
      //     jasmine: true,
      //     globals: {
      //       describe: true,
      //       it: true,
      //       before: true,
      //       after: true,
      //       beforeEach: true,
      //       afterEach: true,
      //       expect: true,
      //       react: true
      //     }
      //   }
      // },

      // create jscs task
      jscs: {
        dev: {
          // tell jscs to test the same files as jshint
          src: ['<%= jshint.dev.src %>', '<%= jshint.mocha.src %>']
        }
      }
    },

		// mocha: {
		// 	// tell mocha where the test file is
		// 	src: ['tests/test_entry.js'],
		// 	options: {
		// 		node: true,
		// 		globals: {
		// 			describe: true,
		// 			it: true,
		// 			before: true,
		// 			after: true,
		// 			beforeEach: true,
		// 			afterEach: true,
		// 			res: true,
		// 			expect: true
		// 		}
		// 	}
		// },

		// create simplemocha task
		simplemocha: {
			dev: {
				src: ['tests/test_entry.js']
			}
		}
	});
	
	// register linting task
  grunt.registerTask('lint', ['jshint:dev', 'jshint:mocha'/*, 'jshint:jasmine'*/]);
	// register mocha test task
	grunt.registerTask('test', ['simplemocha:dev']);
	grunt.registerTask('default', ['test']);
};