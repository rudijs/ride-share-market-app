'use strict';

module.exports = function () {

  return {
    // base path, that will be used to resolve files and exclude
    basePath: './',

    frameworks: [
      'mocha',
      'sinon-chai'
    ],

    // list of files / patterns to load in the browser
    files: [
      // Application dependencies
      'app/bower_components/angular/angular.min.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-mocks/angular-mocks.js',

      // First load app.js
      'app/components/app/app.js',

      // Components

      // app
      'app/components/app/*.js',
      'app/components/app/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      'app/components/app/app-init.js'
    ],

    preprocessors: {

      // test Javascript coverage
      // source files, that you want to generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      //'app/services/!(*_spec)+(.js)': ['coverage'],
      'app/components/**/!(*_spec)+(.js)': ['coverage']

    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'test/coverage/'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: 'LOG_INFO',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  };

};
