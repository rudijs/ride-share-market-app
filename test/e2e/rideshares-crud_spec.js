'use strict';

var fs = require('fs');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test',
  config = require('../../config/app'),
  RsmPage = require('./page-objects/rsm-page'),
  navTop = require('./page-objects/nav-top'),
  rideshareForm = require('./page-objects/form-rideshare'),
  rideshareDetails = require('./page-objects/rideshare-details'),
  baseURL = config.get('e2e').url[env],
  rsmPage = new RsmPage(baseURL),
  jwtFixture = fs.readFileSync(config.get('root') + '/test/fixtures/e2e-jwt.txt').toString();

describe('Rideshares', function() {

  describe('CRUD', function() {

    it('should', function() {

      rsmPage.get('/#!/welcome?jwt=' + jwtFixture);

      // Initial SPA load, wait 1/2 second for the menu to render (it's checking localstorage)
      rsmPage.sleep(2000);

      navTop.clickCreateRideshare();
      expect(navTop.createRideshareTitle.getText()).toEqual('New Rideshare');

      rideshareForm.addGooglePlace('melbourne victoria australia');
      rideshareForm.addGooglePlace('sydney new south wales australia');

      rideshareForm.clickSaveRideshare();

      //rsmPage.pause();
      rsmPage.sleep(2000);

      expect(rideshareDetails.rideshareDetailsTitle.getText()).toEqual('Rideshare Details');

    });

  });

});
