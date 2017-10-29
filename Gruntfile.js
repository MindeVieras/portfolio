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
        imagemin: {
            dynamic: {            
                options: {
                    optimizationLevel: 7,
                    svgoPlugins: [{removeViewBox: false}],
                    // use: [mozjpeg()] // Example plugin usage
                },
                files: [{
                    expand: true,
                    cwd: './src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: './dist/images/'
                }]
            }
        },
        json_minification: {
            target: {
                files: [{
                    expand: true,
                    cwd: './src/models/',
                    src: ['**/*.json'],
                    dest: './dist/models/'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: './src/cv/', src: ['**'], dest: './dist/cv/'},
                ],
            },
        },
        aws: grunt.file.readJSON('./aws-keys.json'),
        aws_s3: {
            options: {
                accessKeyId: '<%= aws.AWSAccessKeyId %>',
                secretAccessKey: '<%= aws.AWSSecretKey %>',
                region: 'eu-west-1',
                uploadConcurrency: 5,
                downloadConcurrency: 5
            },
            prod: {
                options: {
                    bucket: 'mindelis.com',
                    access: 'public-read'
                    // params: {
                    //     ContentEncoding: 'gzip'
                    // }
                },
                files: [{
                    expand: true,
                    cwd: './dist/',
                    src: ['**'],
                    dest: '/',
                    params: {
                        CacheControl: 'max-age=2629746'
                    }
                }]
            },
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
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-json-minification');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-aws-s3');
    
    // Task definition
    grunt.registerTask('default', [
        'sass',
        'concat',
        'watch'
    ]);
    grunt.registerTask('build', [
        'imagemin',
        'json_minification',
        'copy',
        'htmlmin:prod',
        'sass',
        'cssmin',
        'concat',
        'uglify'
    ]);
    grunt.registerTask('deploy', [
        // 'imagemin',
        // 'json_minification',
        // 'copy',
        // 'htmlmin:prod',
        // 'sass',
        // 'cssmin',
        // 'concat',
        // 'uglify',
        'aws_s3'
    ]);

};