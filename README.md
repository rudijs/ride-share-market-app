# ride-share-market-app

Ride Share Market AngularJS App

## Install

- `git clone git@github.com:rudijs/ride-share-market-app.git`
- `cd ride-share-market-app && git checkout develop`
- `npm install -g bower gulp protractor`
- `npm install`
- `bower install`
- `gulp init`
- Update the *config/env/.json* files.

## AngularJS Unit Tests

Karma test runner using Mocha, Sinon and Chai

- Start karma, run tests once and exit.
- `gulp karma-single-run`
- Start karma, run tests, watch for changes, re-run tests.
- `gulp karma`

## Local Development Workflow

- Start local web server.
- `gulp serve`
- Start live watch processes (code linting, server restart, live reload)
- `gulp watch`
- Open Web Browser and enable the [livereload.com](http://livereload.com/extensions/) plugin.

## End-to-End Tests

[Protractor](http://angular.github.io/protractor/#/) is the end-to-end test framework.

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

## Node Tests

- `gulp test`

## Build

- Cache Angular templates
- Compile CSS and JS scripts
- Prepare production index.html
- `gulp build`

## Deployment

- `gulp build`
- `./docker-build.sh x.x.x`
- `ssh vagrant@192.168.33.10 '~/deploy-node-app.rb rsm-app:x.x.x'`

## Notes

Development Docker builds:

- `sudo docker build -t rudijs/rsm-app:x.x.x .`
- Run the container locally for testing.
- Interactive with login.
- `sudo docker run -i --name rsm-app -p 3000:3000 -t rudijs/rsm-app:x.x.x /bin/bash`
- Daemon mode.
- `sudo docker run -d --name rsm-app -p 3000:3000 -t rudijs/rsm-app:x.x.x`

Production builds:

- Docker build, tag and push to local private repository.
- `./docker-build x.x.x`
