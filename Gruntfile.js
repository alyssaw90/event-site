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
          paths: ['css/**/**']
        },
        files: {
          'dist/custom.build.min.css': 'css/less/*.less'
        }
      },
      prod: {
        options: {
          paths: ['css/', 'css/fonts/', 'css/img/'],
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
          'css/custom.build.min.css': ['css/less/*.less', '!css/less/highcontrast.less', '!css/less/twitter-widget.less'],
          'css/highcontrast.min.css': 'css/less/highcontrast.less',
          'css/twitter-widget.min.css': 'css/less/twitter-widget.less'
        }
      }
    },
    //task to clean directories before build
    clean: {
      dev: {
        src: ['build/**/*.js', 'dist/*.*', 'css/custom.build.min.css', 'css/highcontrast.min.css', 'css/twitter-widget.min.css']
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
            src: ['es6/**/*.js'],
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
          'dist/build.browserify.js': ['build/**/*.js']
        },
        options: {
          // transform: ['coffeeify']
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
          'dist/build.min.js': ['dist/build.browserify.js']
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
        files: ['./es6/*.js', './admin/*.js', './models/*.js', './routes/*.js', './scripts/*.js', './*.js', './css/less/*.less', './views/*.html'],
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
        src: ['Gruntfile.js', 'server.js', 'js/**/*.js', 'models/**/*.js', 'routes/**/*.js', '!build/**', '!tests/client/bundle.js', '!tests/karma_tests/bundle.js', '!js/imageMapResizer.min.js', '!js/kickstart.js', '!js/form-validator.js', '!js/imageMapResizer.js', '!js/jquery-ui.min.js', '!js/jquery.base64.js', '!js/kickstart.js'],
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
  grunt.registerTask('bbl', ['clean', 'babel']);
  grunt.registerTask('build', ['clean', 'babel', 'browserify', 'uglify', 'lessProd']);
  grunt.registerTask('start', ['build', 'nodemon:dev']);
	grunt.registerTask('test', ['build', 'test']);
  grunt.registerTask('default', ['concurrent:target2']);
};