'use strict';

module.exports = function (grunt) {
	/*grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-babel');*/
  //load-grunt-tasks loads all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

	// initialize Grunt
	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dev: {
        src: ['build/', 'dist/']
      }
    },
    //register task to run babel and compile es6
    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'es6/',
            src: ['*.js'],
            dest: 'build/',
            ext:'.build.js'
          }
        ]
      }
    },
    //create browserify task
    browserify: {
      dist: {
        files: {
          'dist/build.dist.js': ['build/**/*.js']
        },
        options: {
          // transform: ['coffeeify']
        }
      }
    },
    //create nodemon task to run server
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
		    // create jshint task
    jshint: {
      dev: {
        // tell jshint what check
        src: ['Gruntfile.js', 'server.js', 'js/**/*.js', 'models/**/*.js', 'routes/**/*.js', '!build/**', '!tests/client/bundle.js', '!tests/karma_tests/bundle.js', '!js/imageMapResizer.min.js', '!js/kickstart.js', '!js/form-validator.js', '!js/imageMapResizer.js', '!js/jquery-ui.min.js', '!js/jquery.base64.js', '!js/kickstart.js'],
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
        src: ['tests/test_entry.js', '!tests/client/bundle.js', '!tests/karma_tests/bundle.js'],
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
      jasmine: {
        src: ['<%= jshint.dev.src %>', '<%= jshint.mocha.src %>'],
        options: {
          node: true,
          jasmine: true,
          globals: {
            describe: true,
            it: true,
            before: true,
            after: true,
            beforeEach: true,
            afterEach: true,
            expect: true,
            react: true
          }
        }
      },

      // create jscs task
      jscs: {
        dev: {
          // tell jscs to test the same files as jshint
          src: ['<%= jshint.dev.src %>', '<%= jshint.mocha.src %>']
        }
      }
    },

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
	
	// register linting task
  grunt.registerTask('lint', ['jshint:dev', 'jshint:mocha', 'jshint:jasmine']);
	// register mocha test task
	grunt.registerTask('test', ['simplemocha:dev']);
  // grunt.registerTask('nodemon', ['nodemon:dev']);
  grunt.registerTask('bbl', ['clean', 'babel']);
  grunt.registerTask('build', ['bbl', 'browserify', 'nodemon:dev']);
	grunt.registerTask('default', ['build', 'test']);
};