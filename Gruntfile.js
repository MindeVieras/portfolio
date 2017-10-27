//Gruntfile
'use strict';

module.exports = function(grunt) {
    //Initializing the configuration object
    grunt.initConfig({
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    './dist/index.html': './src/index.html',
                    './dist/views/main.html': './src/views/main.html'
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    "./src/css/styles.css" : "./src/sass/main.scss"
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './dist/css/styles.css': './src/css/styles.css'
                }
            }
        },
        concat: {
          options: {
            separator: ';',
          },
          dev: {
            src: [
              './bower_components/jquery/dist/jquery.js',
              './bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
              './bower_components/angular/angular.js',
              './bower_components/angular-route/angular-route.js',
              './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
              './bower_components/angular-svg-round-progressbar/build/roundProgress.js',
              './src/app.js',
              './src/controllers/*.js'
            ],
            dest: './src/js/app.js'
          }
        },
        uglify: {
            prod: {
                files: {
                    './dist/js/app.js': [
                        './src/js/app.js'
                    ]
                },
                options: {
                    mangle: false,
                    compress: {
                        drop_console: true
                    },
                    compress: true,
                    sourceMap: false
                }
            }
        },
        watch: {
            html: {
                files: ['./src/**/*.html']
            },
            js: {
                files: ['./src/app.js', './src/controllers/**/*.js'],
                tasks : [
                    'concat'
                ]
            },
            sass: {
                files: ['./src/sass/**/*.scss'],
                tasks: [
                    'sass'
                ]
            },
            options: {
                livereload: true
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Task definition
    grunt.registerTask('default', [
        'sass',
        'concat',
        'watch'
    ]);
    grunt.registerTask('build', [
        'htmlmin:prod',
        'sass',
        'cssmin',
        'concat',
        'uglify'
    ]);

};