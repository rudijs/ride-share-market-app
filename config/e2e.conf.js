'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test',
  config = require('./app');

exports.config = {

  // The address of a running selenium server.
  seleniumAddress: (env.match(/test|development/)) ? config.get('e2e').seleniumAddress : null,

  capabilities: {
    'browserName': 'chrome'
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  suites: {
    //smoke: 'spec/smoketests/*.js',
    app: '../test/e2e/app-component-app.spec.js'
  }

};