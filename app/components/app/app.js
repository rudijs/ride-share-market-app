(function () {
  'use strict';

  angular.module('app', [
    'LocalForageModule',
    'app.routes.auth.policy',
    'app.routes',
    'app.directives',
    'app.services',
    'app.components'
  ])
    .config(function ($locationProvider) {
      // Enable HTML5 Location Mode
      $locationProvider.hashPrefix('!');
    })
    .constant('rsmConfig', {
      version: (function() {
        var injector = angular.injector(['ng']),
          $window = injector.get('$window');
        return ($window.rsmConfig && $window.rsmConfig.version) ? $window.rsmConfig.version : 'latest';
      })()
    });

  // Create application services module and define the dependencies
  angular.module('app.services', ['ngMaterial']);

  angular.module('app.directives', []);

  angular.module('app.components', [
    'users',
    'rideshares'
  ]);

})();
