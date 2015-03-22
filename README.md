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
- Open Web Browser and enable the [livereload.com](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) plugin.

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

## Deployment

Deployment is done using Docker.

Development builds:

- Create the logging directory which will be mounted from the host to the container.
- `mkdir -p "$(pwd)/tmp/log"`
- `sudo chown rsm-data "$(pwd)/tmp/log"`
- Build the Docker image.
- `sudo docker build -t rudijs/rsm-app:0.0.1 .`
- Run the container locally for testing.
- Interactive with login.
- `sudo docker run -i --name rsm-app -v $(pwd)/tmp/log/:/srv/ride-share-market-app/log -p 3000:3000 -t rudijs/rsm-app:0.0.1 /bin/bash`
- Daemon mode.
- `sudo docker run -d --name rsm-app -v $(pwd)/tmp/log/:/srv/ride-share-market-app/log -p 3000:3000 -t rudijs/rsm-app:0.0.1`

Production builds:

- Docker build, tag and push to local private repository.
- `./docker-build x.x.x`

## Deployment

- On the remote server.
- `sudo docker pull 192.168.33.10:5000/rudijs/rsm-app:x.x.x`
- `sudo docker rm -f -v rsm-app && sudo docker run -d --restart always --name rsm-app --cap-add SYS_PTRACE --security-opt apparmor:unconfined -p 3000:3000 192.168.33.10:5000/rudijs/rsm-app:x.x.x`
- Note: the *--cap-add SYS_PTRACE --security-opt apparmor:unconfined* flags above are required for pm2. See [here](https://github.com/Unitech/PM2/issues/1086)
- Note: the docker container will export the application directory as a docker volume.
- This data-volume is used by other containers (eg. logstash, nginx).
