(function () {
  'use strict';

  /**
   * Configures local storage with Local Forage.
   * Components that require local storage scoped under 'user' may include this module in their dependencies.
   */
  angular
    .module('users.service.local.storage', [ 'LocalForageModule' ])
    .config(function ($localForageProvider) {
      $localForageProvider.config({
        name: 'user', // name of the database and prefix for your data
        storeName: 'data', // name of the table
        description: 'User Data Local Storage'
      });
    });

})();
