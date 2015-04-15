'use strict';

var config = require('../../config/app');

module.exports = function (app) {

  app.get('/signin/google', function *signinGoogle(next) {
    this.redirect(config.get('oauth').signin.google);
    yield next;
  });

};
