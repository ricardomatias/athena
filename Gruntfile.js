'use strict';

const open = require('open');

const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    less: {
      dev: {
        options: {
          paths: [ '' ]
        },
        files: {
          'public/styles.css': 'client/index.less'
        }
      }
    },
    clean: [ 'public' ],
    concurrent: {
      dev: {
        tasks: [ 'nodemon', 'watch' ],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          nodeArgs: [],
          env: {
            PORT: '5455'
          },
          // omit this property if you aren't serving HTML files and
          // don't want to open a browser tab on start
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function() {
                open('http://localhost:3000');
              }, 1000);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
            });
          }
        }
      }
    },
    watch: {
      less: {
        files: [ 'client/**/*.less' ],
        tasks: [ 'less' ],
        options: {
          livereload: true
        }
      },
      js: {
        files: [ 'client/**/*.js' ],
        tasks: [ 'webpack' ],
        options: {
          livereload: true
        }
      }
    },
    webpack: {
      config: webpackConfig
    }
  });

  grunt.registerTask('client', [ 'clean', 'webpack', 'less' ]);

  grunt.registerTask('default', [ 'client', 'concurrent:dev' ]);
};
