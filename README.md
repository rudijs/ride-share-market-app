# ride-share-market-app

Ride Share Market AngularJS App

## Install

- `git clone git@github.com:rudijs/ride-share-market-app.git`
- `cd ride-share-market-app && git checkout develop`
- `npm install -g bower gulp`
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

Development - Start dev server and test

- Console 1:
- `gulp serve`
- Console 2:
- Run all tests.
- `gulp test-e2e`
- Run a selected *suite* of tests from the *config/protractor.conf.js* file.
- `gulp test-e2e --suite app`

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

## Mobile Testing
 
In the loc environment use a tool like airdoid.com to send a URL and open a page on Android Chrome.

- Ex: Use and IP address for local mobile devices
- `http://192.168.0.102:3000/#!/welcome?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQwOTg4NzM0MH0.90p7HsF59e8qds4F-YQfckMKfy_cA5bcnub6EmZEAQw`
- `http://local.ridesharemarket.com:3000/#!/welcome?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQwOTg4NzM0MH0.90p7HsF59e8qds4F-YQfckMKfy_cA5bcnub6EmZEAQw`
