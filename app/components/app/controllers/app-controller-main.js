(function (module) {
  'use strict';

  function MainCtrl(rsmConfig) {

    this.greeting = 'Hello World';

    this.version = rsmConfig.version;

  }

  module.controller('MainCtrl', MainCtrl);

})(angular.module('app'));
