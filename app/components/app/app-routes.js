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
        })

        .state('about', {
          url: '/about',
          templateUrl: 'components/app/templates/app-template-about-us.html',
          data: {noAuth: true}
        })

        .state('privacy', {
          url: '/privacy',
          templateUrl: 'components/app/templates/app-template-privacy-policy.html',
          data: {noAuth: true}
        })

        .state('terms', {
          url: '/terms',
          templateUrl: 'components/app/templates/app-template-terms.html',
          data: {noAuth: true}
        })

        .state('contact', {
          url: '/contact',
          templateUrl: 'components/app/templates/app-template-contact.html',
          data: {noAuth: true}
        })

    });

})();
