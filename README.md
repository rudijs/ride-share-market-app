# ride-share-market-app

Ride Share Market AngularJS App

## Install

- `git clone git@github.com:rudijs/ride-share-market-app.git`
- `cd ride-share-market-app && git checkout develop`
- `npm install -g bower gulp protractor`
- `npm install`
- `bower install`
- `gulp init`
- Update the *config/env/\*.json*

## Local Development Workflow

- Start local web server.
- `gulp serve`
- Start live watch processes (code linting, server restart, live reload)
- `gulp watch`
- Open Web Browser and enable the [livereload.com](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) plugin.

## AngularJS Unit Tests

Karma test runner using Mocha, Sinon and Chai

- Start karma, run tests, watch for changes, re-run tests.
- `gulp karma`
- Start karma, run tests once and exit
- `gulp karma-single-run`

## End-to-End Tests

[Protractor](http://angular.github.io/protractor/#/) the end-to-end test framework.

- Install webdriver (initial only)
- `webdriver-manager update`
- Start webdriver
- `webdriver-manager start`

Development - Start dev server and test

- `gulp serve`
- Run all tests.
- `protractor config/e2e.conf.js`
- Run a selected *suite* of tests from the *e2e.conf.js* file.
- `protractor config/e2e.conf.js --suite app`
