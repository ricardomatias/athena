/* eslint import/no-extraneous-dependencies: 0 */

const open = require('open'),
      timeGrunt = require('time-grunt'),
      loadTasks = require('load-grunt-tasks');

let webpackConfig;

/* eslint "global-require": 0 */
if (process.env === 'production') {
  webpackConfig = require('./webpack.config.prod');
} else {
  webpackConfig = require('./webpack.config');
}

module.exports = (grunt) => {
  timeGrunt(grunt);
  loadTasks(grunt);

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
        tasks: [ 'watch', 'nodemon' ],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          nodeArgs: [ '--trace-warnings' ],
          env: {
            PORT: 3000
          },
          watch: [ 'server', 'index.js' ],
          // omit this property if you aren't serving HTML files and
          // don't want to open a browser tab on start
          callback: (nodemon) => {
            nodemon.on('log', (event) => {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', () => {
              // Delay before server listens on port
              setTimeout(() => {
                open('http://localhost:3000');
              }, 1000);
            });
          }
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          { expand: true, src: [ 'vendors/*' ], dest: 'public' },
          { expand: true, src: [ 'assets/*' ], dest: 'public' },
        ]
      },
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

  grunt.registerTask('client', [ 'clean', 'copy', 'less', 'webpack' ]);

  grunt.registerTask('dev', [ 'client', 'nodemon' ]);

  grunt.registerTask('default', [ 'client', 'concurrent:dev' ]);
};
