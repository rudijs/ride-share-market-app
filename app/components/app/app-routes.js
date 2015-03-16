(function () {
  'use strict';

  // App routing
  angular.module('app.routes', [
    'ui.router'
  ])
    .config(function ($stateProvider, $urlRouterProvider) {

      // Default route
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'components/app/templates/app-template-main.html',
          controller: 'MainCtrl',
          controllerAs: 'vm',
          data: {noAuth: true}
        });
    });

})();
