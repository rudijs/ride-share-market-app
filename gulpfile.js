(function () {
  'use strict';

  var gulp = require('gulp'),
    taskListing = require('gulp-task-listing'),
    fs = require('fs'),
  // linting
    jshint = require('gulp-jshint'),
  // local dev server and live reload
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
  // build
    exec = require('child_process').exec,
    clean = require('gulp-clean'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html'),
    useref = require('gulp-useref'),
    ngAnnotate = require('gulp-ng-annotate'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    runSequence = require('run-sequence');

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
    'app/styles/**/*.css',
    'app/template-cache/templates.js'
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
    gulp.watch('app/components/**/*.html', ['build-templatecache']);

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

  gulp.task('karma-single-run', function () {
    var conf = require('./config/karma.conf.js')();
    ////conf.browsers = ['Firefox', 'Chrome'];
    conf.singleRun = true;

    var server = require('karma').server;
    return server.start(conf, function (exitCode) {
      console.log('Karma has exited with ' + exitCode);
      process.exit(exitCode);
    });

  });

  gulp.task('karma', function () {
    var conf = require('./config/karma.conf.js')();
    ////conf.browsers = ['Firefox', 'Chrome'];

    var server = require('karma').server;
    return server.start(conf, function (exitCode) {
      console.log('Karma has exited with ' + exitCode);
      process.exit(exitCode);
    });

  });

  gulp.task('test', function (cb) {

    var tests = '\'httpd/**/*.js\'';

    // TODO: use command line options library here.
    if (process.argv[3] === '--suite' && process.argv[4]) {
      tests = process.argv[4];
    }

    exec('NODE_ENV=test node --harmony ./node_modules/istanbul-harmony/lib/cli.js cover node_modules/mocha/bin/_mocha ' +
    '-x \'*.spec.js\' --root httpd/ --dir test/coverage  -- -R spec ' + tests, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });

  gulp.task('build-clean', function () {
    return gulp.src('dist/')
      .pipe(clean());
  });

  gulp.task('build-templatecache', function () {
    gulp.src([
      'app/**/*.html',
      '!app/bower_components/**/*.html'
    ])
      .pipe(minifyHTML({
        quotes: true
      }))
      .pipe(templateCache({module: 'app'}))
      .pipe(gulp.dest('app/template-cache'));
  });

  gulp.task('build-copy-images', function () {
    return gulp.src('./app/images/**/*')
      .pipe(gulp.dest('./dist/images'));
  });

  gulp.task('build-scripts-styles', function () {
    var assets = useref.assets({searchPath: 'app'});

    return gulp.src('httpd/views/index.dev.html')

      // Concatenate with gulp-useref
      .pipe(assets)

      .pipe(gulpif('*.js', ngAnnotate()))

      // Minify any javascript sources
      .pipe(gulpif('*.js', uglify()))

      // Minify any CSS sources
      .pipe(gulpif('*.css', minifyCss()))

      // Rename the concatenated files
      .pipe(rev())
      .pipe(assets.restore())
      .pipe(useref())

      // Substitute in new filenames
      .pipe(revReplace())
      .pipe(gulp.dest('dist'));
  });

  gulp.task('build-index', function (cb) {
    return exec('mv ./dist/index.dev.html ./httpd/views/index.prod.html', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      return cb(err);
    });
  });

/*  gulp.task('build-css', function () {
    return gulp.src('./app/css*//*')
      .pipe(gulp.dest('./dist/css'));
  });*/

/*  gulp.task('build-js', function () {
    gulp.src('./app/bower_components/modernizr/feature-detects*//*.js')
      .pipe(gulp.dest('./dist/bower_components/modernizr/feature-detects'));

    return gulp.src('./app/bower_components/modernizr/modernizr.js')
      .pipe(gulp.dest('./dist/bower_components/modernizr'));
  });*/

  gulp.task('build', function (callback) {
    runSequence(
      'build-clean',
      'build-templatecache',
      'build-scripts-styles',
      // build in parallel
      [
        'build-copy-images'
        //'build-css',
        //'build-js'
      ],
      'build-index',
      callback
    );
  });

})();