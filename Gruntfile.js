/*global module:false*/
module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    // uglify: {
      // dist: {
        // files: [{
			// expand: true,
			// cwd: 'src/js',
			// src: '**/*.js',
			// dest: 'build/js'
		// }]
      // }
    // },
	cssmin: {
		target: {
			files: [{
				expand: true,
				cwd: 'app/css',
				src: ['*.css', '!*.min.css'],
				dest: 'app/css',
				ext: '.min.css'
			}]
		}
	},
	connect: {
		server: {
			options: {
				port: 8000,
				protocol: "http",
				hostname: "localhost",
				base: "app",
				directory: null,
				open: false,
				keepalive: true
			}
		}
	},
	compass: {
		dist: {
			options: {
				sassDir: 'app/sass',
				cssDir: 'app/css'
			}
		}
	},
	watch: {
		html: {
			files: ['app/**/*.html', 'app/**/*.js', 'app/**/*.json'],
			options: {
				livereload: true
			}
		},
		sass: {
			files: 'app/sass/*.scss',
			tasks: ['compass', 'cssmin'],
			options: {
				livereload: true
			}
		},
		scripts: {
			files: ['app/**/*.js'],
			//tasks: ['uglify'],
			options: {
				spawn: false,
				livereload: true
			},
			directives: {
				node: true
			}
		}
	}
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['compass', 'cssmin']);
  
  // Testing tasks
  

};
