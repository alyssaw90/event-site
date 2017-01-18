/// <binding BeforeBuild='build' />
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
    //task to parse less to css
    less: {
      dev: {
        options: {
          paths: ['app/css/', 'app/css/fonts/', 'app/css/img/'],
        },
        files: {
          'app/css/custom.build.min.css': ['app/css/less/*.less', '!app/css/less/highcontrast.less', '!app/css/less/twitter-widget.less'],
          'app/css/highcontrast.min.css': 'app/css/less/highcontrast.less',
          'app/css/twitter-widget.min.css': 'app/css/less/twitter-widget.less'
        }
      },
      prod: {
        options: {
          paths: ['app/css/', 'app/css/fonts/', 'app/css/img/'],
          plugins: [
            new (require('less-plugin-autoprefix'))({
              browsers: ['last 2 versions', '> 1%', 'ie > 6']
            }),
            new (require('less-plugin-clean-css'))({
              sourceMap: false,
              // relativeUrls: true
            })
          ]
        },
        files: {
          'app/css/custom.build.min.css': ['app/css/less/*.less', '!app/css/less/highcontrast.less', '!app/css/less/twitter-widget.less'],
          'app/css/highcontrast.min.css': 'app/css/less/highcontrast.less',
          'app/css/twitter-widget.min.css': 'app/css/less/twitter-widget.less'
        }
      }
    },
    //task to clean directories before build
    clean: {
      all: {
        src: ['app/build/**/*.*', 'app/build/app/', 'app/css/custom.build.min.css', 'app/css/highcontrast.min.css', 'app/css/twitter-widget.min.css', '!app/build/.gitignore']
      },
      build: {
        src: ['app/build/**/*.*', 'app/build/app/', '!app/build/build.min.js', '!app/build/build.min.js.map', '!app/build/.gitignore']
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
            cwd: '',
            src: ['app/es6/**/*.js', 'app/components/**/*.js'],
            dest: 'app/build/',
            // ext:'.build.js'
          },
          {
            expand: true,
            cwd: '',
            src: ['app/es6/**/*.js'],
            dest: 'app/build/',
            // ext:'.build.js'
          },
          /*{
            expand: true,
            cwd: '',
            src: ['app/lib/kickstart.js'],
            dest: 'app/build/',
            // ext:'.build.js'
          }*/
        ]
      }
    },
    //create browserify task
    browserify: {
      dist: {
        files: {
          'app/build/build.browserify.js': ['app/build/**/*.js']
        },
        options: {
          // transform: ['coffeeify']
        }
      },
      dev: {
        files: {
          'app/build/build.min.js': ['app/build/**/*.js']
        }
      }
    },
    //create uglify task to minify javascript
    uglify: {
      my_target: {
        options: {
          sourceMap: true
        },
        files: {
          'app/build/build.min.js': ['app/build/build.browserify.js']
        }
      }
    },
    //create nodemon task to run server
    nodemon: {
      dev: {
        script: 'server.js'
      }
    }, 
    //watch for changes in es6 files
    watch: {
      scripts: {
        files: ['.app/es6/*.js', '.app/admin/*.js', '.app/models/*.js', '.app/routes/*.js', '.app/scripts/*.js', '.app/*.js', '.app/css/less/*.less', './views/*.html'],
        tasks: ['build'],
        options: {
          interrupt: true,
          // livereload: true
        },
      }
    },
    //create concurrent task to run watch and nodemon concurrently
    concurrent: {
      target1: ['clean', 'babel', 'browserify', 'less:prod', 'uglify'],
      target2: {
          tasks: ['start', 'watch'],
          options: {
              logConcurrentOutput: true
          }
      }
    },
		// create jshint task
    jshint: {
      dev: {
        // tell jshint what check
        src: ['Gruntfile.js', 'server.js', 'app/js/**/*.js', 'models/**/*.js', 'routes/**/*.js', '!app/build/**', '!tests/client/bundle.js', '!tests/karma_tests/bundle.js', '!app/lib/kickstart.js', '!app/lib/imageMapResizer.js'],
        options: {
          node: true,
          // esversion: 6, //this option should replace esnext, but it doesn't currently work
          esnext: true,
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
          // esversion: 6, //this option should replace esnext, but it doesn't currently work
          esnext: true,
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
          // esversion: 6, //this option should replace esnext, but it doesn't currently work
          esnext: true,
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
  grunt.registerTask('lessProd', ['less:prod']);
  grunt.registerTask('build:dev', ['clean:all', 'babel', 'browserify:dev', 'less:dev']);
  grunt.registerTask('build', ['clean:all', 'babel', 'browserify:dist', 'uglify', 'lessProd', 'clean:build']);
  grunt.registerTask('start:dev', ['build:dev', 'nodemon:dev']);
  grunt.registerTask('start', ['build', 'nodemon:dev']);
	grunt.registerTask('test', ['build', 'test']);
  grunt.registerTask('default', ['start']);
};