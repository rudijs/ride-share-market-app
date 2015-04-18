(function () {
  'use strict';

  angular
    .module('user.routes', ['ui.router'])
    .config(function ($stateProvider) {

      $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'components/user/templates/user-template-signin.html',
          data: {noAuth: true}
        })

        .state('welcome', {
          url: '/welcome',
          template: '<p></p>',
          controller: 'WelcomeCtrl',
          data: {noAuth: true}
        })

        .state('signout', {
          url: '/signout',
          templateUrl: 'components/user/templates/users-template-signout.html',
          controller: 'SignOutCtrl'
        })

        .state('profile', {
          url: '/profile/{id:[0-9a-fA-F]{24}}',
          templateUrl: 'components/user/templates/users-template-profile.html',
          controller: 'UsersProfileCtrl as profile'
        });

    });

})();
