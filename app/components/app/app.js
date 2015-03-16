(function () {
  'use strict';

  angular.module('app', [
    'ngMaterial',
    'app.routes',
    'app.services'
  ])
    .config(function ($locationProvider) {
      // Enable HTML5 Location Mode
      $locationProvider.hashPrefix('!');
    });

  // Create application services module and define the dependencies
  angular.module('app.services', []);

})();
