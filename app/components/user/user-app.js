(function () {
  'use strict';

  angular.module('user', [
    'LocalForageModule', // move to user component
    'user.routes',
    'user.services'
  ]);

  // Create application services module and define the dependencies
  angular.module('user.services', [
    'user.service.local.storage',
    'user.service.url.inspector',
    'user.service.jwt.manager'
  ]);

})();
