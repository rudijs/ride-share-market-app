'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  helmet = require('koa-helmet'),
  compress = require('koa-compress'),
  router = require('koa-router'),
  render = require('koa-ejs'),
  path = require('path'),
  requireWalk = require('require-walk'),
  koaJsonLogger = require('koa-json-logger'),
  serve = require('koa-static');

var config = require('../config/app');

module.exports = function (app) {

  app.use(helmet.defaults());

  app.use(koaJsonLogger({name: 'rsm-app'}));

  app.use(compress());

  //var assetsPath;
  app.use(serve(path.join(__dirname, (env === 'production') ? './../dist' : './../app')));

  // EJS Templates
  render(app, {
    root: path.join(__dirname, './../httpd/views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
  });

  app.use(router(app));

  // Routes
  requireWalk(config.get('root') + '/httpd/routes')(app);

};
