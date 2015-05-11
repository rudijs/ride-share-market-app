'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test',
  config = require('../../config/app'),
  RsmPage = require('./page-objects/rsm-page'),
  navTop = require('./page-objects/nav-top'),
  rideshareForm = require('./page-objects/form-rideshare'),
  baseURL = config.get('e2e').url[env],
  rsmPage = new RsmPage(baseURL);

//http://local.ridesharemarket.com:3000/#!/welcome?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQwOTg4NzM0MH0.90p7HsF59e8qds4F-YQfckMKfy_cA5bcnub6EmZEAQw

describe('Rideshares', function() {

  describe('CRUD', function() {

    it('should', function() {

      rsmPage.get('/#!/welcome?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQwOTg4NzM0MH0.90p7HsF59e8qds4F-YQfckMKfy_cA5bcnub6EmZEAQw');

      // Initial SPA load, wait 1/2 second for the menu to render (it's checking localstorage)
      rsmPage.sleep(2000);

      navTop.clickCreateRideshare();
      expect(navTop.createRideshareTitle.getText()).toEqual('New Rideshare');

      rideshareForm.addGooglePlace('melbourne victoria australia');
      rideshareForm.addGooglePlace('sydney new south wales australia');

      //rsmPage.pause();

      expect(true).toBeTruthy();

    });

  });

});
