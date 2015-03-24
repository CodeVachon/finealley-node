module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				} // close .globals
			}, // close .options
			file: {
				src: ['gruntfile.js']
			} // close .file
		}, // close jshint
		jade: {
			options: {
				pretty: true
			},
			file: {},
			compile: {
				src: "jade/test.jade",
				dest: "jade/test.html"
			},
			buildindex: {
				files: {
					"wwwroot/index.html": "src/jade/index.jade"
				}
			}
		},
		imagemin: {
			file: {},
			dynamic: {                         // Another target
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'src/img/',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'wwwroot/includes/img/'                  // Destination path prefix
				}]
			}
		},
		less: {
			build: {
				files: {
					'wwwroot/includes/css/<%= pkg.name %>.css': 'src/less/bootstrap.less'
				}
			}
		},
		uglify: {
			finealley: {
				files: {
					'wwwroot/includes/js/finealley.min.js': 'src/js/*.js'
				}
			}
		},
		watch: {
			jsfiles: {
				files: ['src/js/**/*.js'],
				tasks: ['uglify:finealley'],
				options: {
					spawn: false
				}
			},
			less: {
				files: ['src/less/**/*.less'],
				tasks: ['less:build'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['src/img/**/*.jpg','src/img/**/*.png','src/img/**/*.gif'],
				tasks: ['imagemin:dynamic'],
				options: {
					spawn: false
				}
			},
			jade: {
				files: ['src/jade/**/*.jade','!src/jade/includes/**/*.jade'],
				tasks: ['jade:buildindex'],
				options: {
					spawn: false
				}
			},
			markdown: {
				files: ['src/markdown/**/*.md'],
				tasks: ['jade:buildindex'],
				options: {
					spawn: false
				}
			},
			gruntfile: {
				files: ['gruntfile.js'],
				tasks: ['jshint:file'],
				options: {
					spawn: false
				}
			}
		} // close watch
	}); // close grunt.initConfig

	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
}; // close module.exports
