(function () {
  'use strict';

  angular.module('app', [
    'LocalForageModule', // move to user component
    'app.routes',
    'app.services'
  ])
    .config(function ($locationProvider) {
      // Enable HTML5 Location Mode
      $locationProvider.hashPrefix('!');
    });

  // Create application services module and define the dependencies
  angular.module('app.services', ['ngMaterial']);

})();
