'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test',
  config = require('../../config/app');

describe('Ride Share Market', function () {

  describe('app', function () {

    var baseURL = config.get('e2e').url[env],
      rsmPage;

    beforeEach(function () {
      console.log(baseURL);
      rsmPage = new RsmPage(baseURL);
    });

    it('should load the home page', function () {

      rsmPage.get('/');

      // Initial SPA load, wait 1/2 second for the menu to render (it's checking localstorage)
      rsmPage.sleep(500);

      expect(rsmPage.homePageTitle.getText()).toEqual('Ride Share Market (version 0.0.35)');
    });

    it('should load the about us page', function () {
      rsmPage.clickAboutUs();
      expect(rsmPage.aboutUsTitle.getText()).toEqual('About Us');
    });

    it('should load the privacy policy page', function () {
      rsmPage.clickPrivacyPolicy();
      expect(rsmPage.privacyPolicyTitle.getText()).toEqual('Privacy Policy');
    });

    it('should load the terms and conditions page', function () {
      rsmPage.clickTerms();
      expect(rsmPage.termsTitle.getText()).toEqual('Ride Share Market Terms and Conditions ("Agreement")');
    });

    it('should load the contact us page', function () {
      rsmPage.clickContact();
      expect(rsmPage.contactTitle.getText()).toEqual('Contact Us');
    });

    it('should link to and load the home page', function () {
      rsmPage.clickHome();
      expect(rsmPage.homePageTitle.getText()).toEqual('Ride Share Market (version 0.0.35)');
    });
  });

  var RsmPage = function (baseURL) {

    var width = 1024;
    var height = 768;
    browser.driver.manage().window().setSize(width, height);

    this.baseURL = baseURL;

    this.get = function (path) {
      browser.get(this.baseURL + path);
    };

    this.sleep = function(ms) {
      if (!ms) {
        ms = 100;
      }
      browser.sleep(ms);
    };

    this.cssAnimationDelay = function() {
      browser.sleep(210);
    };

    // Home Page
    this.homeLink = element(by.xpath("//rsm-nav-top//a[@href='#!/']")); // jshint ignore:line
    this.homePageTitle = element(by.id('title'));
    this.clickHome = function () {
      this.homeLink.click();
      this.cssAnimationDelay();
    };

    // About Us
    this.aboutUsLink = element(by.xpath("//rsm-nav-top//a[@href='#!/about']")); // jshint ignore:line
    this.aboutUsTitle = element(by.css('div > h1'));
    this.clickAboutUs = function () {
      this.aboutUsLink.click();
      this.cssAnimationDelay();
    };

    // Privacy Policy
    this.privacyPolicyLink = element(by.xpath("//rsm-nav-top//a[@href='#!/privacy']")); // jshint ignore:line
    this.privacyPolicyTitle = element(by.css('div > h1'));
    this.clickPrivacyPolicy = function () {
      this.privacyPolicyLink.click();
      this.cssAnimationDelay();
    };

    // Terms and Conditions
    this.termsLink = element(by.xpath("//rsm-nav-top//a[@href='#!/terms']")); // jshint ignore:line
    this.termsTitle = element(by.css('div > h1'));
    this.clickTerms = function () {
      this.termsLink.click();
      this.cssAnimationDelay();
    };

    // Contact Us
    this.contactLink = element(by.xpath("//rsm-nav-top//a[@href='#!/contact']")); // jshint ignore:line
    this.contactTitle = element(by.css('div > h1'));
    this.clickContact = function () {
      this.contactLink.click();
      this.cssAnimationDelay();
    };

  };

});
