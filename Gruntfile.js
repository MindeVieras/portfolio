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
              // './bower_components/owl.carousel/dist/owl.carousel.js',
              // './bower_components/slick-carousel/slick/slick.js',
              // './bower_components/angular/angular.js',
              // './bower_components/angular-route/angular-route.js',
              // './bower_components/ngmap/build/scripts/ng-map.js',
              // './bower_components/v-accordion/dist/v-accordion.js',
              // './bower_components/angular-slick-carousel/dist/angular-slick.js'
              './src/app.js',
              './src/controllers/*.js'
            ],
            dest: './src/js/scripts.js'
          },
        },
        uglify: {
            prod: {
                files: {
                    './dist/js/scripts.js': [
                        './src/js/scripts.js'
                    ]
                },
                options: {
                    mangle: false,
                    // compress: {
                    //     drop_console: true
                    // },
                    compress: true,
                    sourceMap: false
                }
            },
            libs: {
                files: {
                    './app/js/libs.min.js': [
                        './app/js/libs.js'
                    ]
                },
                options: {
                    mangle: true,
                    // compress: {
                    //     drop_console: true
                    // },
                    compress: true,
                    sourcemap: false
                }
            }
        },
        watch: {
            html: {
                files: ['./src/**/*.html']
            },
            // js: {
            //     files: ['./app/scripts/**/*.js'],
            //     tasks : [
            //         'uglify:app'
            //     ]
            // },
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
        // 'uglify:libs',
        // 'uglify:app',
        'watch'
    ]);
    grunt.registerTask('build', [
        'htmlmin:prod',
        'sass',
        'cssmin',
        'concat',
        'uglify:prod'
    ]);

};