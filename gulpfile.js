(function () {
  'use strict';

  var gulp = require('gulp'),
    taskListing = require('gulp-task-listing'),
    fs = require('fs'),
    // linting
    jshint = require('gulp-jshint'),
    // local dev server and live reload
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

  var nodemonConfig = JSON.parse(fs.readFileSync('./nodemon.json'));

  var jsLintFiles = [
    // config
    'gulpfile.js',
    'config/**/*.js',

    // angular
    'app/**/*.js',
    '!app/bower_components/**/*.js',
    '!app/template-cache/templates.js',

    // node
    'httpd/**/*.js',

    // tests
    'test/**/*.js',
    '!test/coverage/**/*.js'

  ];

  var liveReloadFiles = [
    'httpd/views/index.dev.html',
    'app/components/**/*.js',
    'app/components/**/*.html',
    'app/styles/**/*.css'
    //'app/template-cache/templates.js'
  ];

  var stylusFiles = [
    'app/components/**/*.styl'
  ];

  gulp.task('default', taskListing);

  gulp.task('help', taskListing);

  gulp.task('init', function () {
    gulp.src('./config/env/example/*')
      .pipe(gulp.dest('./config/env'));
  });

  gulp.task('watch', function () {
    gulp.watch(jsLintFiles, ['lint']);
    gulp.watch(stylusFiles, ['stylus']);
    //gulp.watch('app/components/**/*.html', ['build-templatecache']);

    // Livereload
    livereload.listen();
    gulp.watch(liveReloadFiles).on('change', livereload.changed);

  });

  gulp.task('lint', function () {
    gulp.src(jsLintFiles)
      .pipe(jshint('.jshintrc', {fail: true}))
      .pipe(jshint.reporter()); // Console output
  });

  gulp.task('stylus', function () {

    var stylus = require('gulp-stylus'),
      prefix = require('gulp-autoprefixer');

    gulp.src(stylusFiles)
      .pipe(stylus())
      .pipe(prefix())
      .pipe(gulp.dest('./app/styles'));
  });


  gulp.task('serve', function () {
    nodemon(nodemonConfig)
      .on('restart', function () {
        console.log('Local Dev Server Restarting...');
      });
  });

  gulp.task('karma', function () {
    var conf = require('./config/karma.conf.js')();
    ////conf.browsers = ['Firefox', 'Chrome'];
    //console.log(conf);
    //return require('./node_modules/karma').server.start(conf);

    var server = require('karma').server;
    return server.start(conf, function (exitCode) {
      console.log('Karma has exited with ' + exitCode);
      process.exit(exitCode);
    });

  });


})();