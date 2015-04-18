(function () {
  'use strict';

  angular.module('user', [
    'LocalForageModule', // move to user component
    'restangular',
    'angular-jwt',
    'user.routes',
    'user.services',
    'user.directives'
  ])
    .config(function configRestangular(RestangularProvider) {

      var injector = angular.injector(['ng']);
      var $window = injector.get('$window');

      if($window.rsmConfig && $window.rsmConfig.api) {
        RestangularProvider.setBaseUrl($window.rsmConfig.api);
      }

      RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      });

    })
    .config(function configAngularJwt($httpProvider, jwtInterceptorProvider) {

      // Send the JWT with each request
      jwtInterceptorProvider.tokenGetter = function () {
        var injector = angular.injector(['user.service.jwt.manager', 'ng']);
        var JwtSvc = injector.get('JwtSvc');
        return JwtSvc.getJwt().then(function getJwtSuccess(token) {
          return token;
        });
      };
      $httpProvider.interceptors.push('jwtInterceptor');

    });

  // Create application services module and define the dependencies
  angular.module('user.services', [
    'user.service.local.storage',
    'user.service.url.inspector',
    'user.service.jwt.manager',
    'user.service.user.profile'
  ]);

  /**
   * All the directives for the users component in separate module.
   *
   * The reason is for testability.
   * LocalForage is used in the main users-app.js file, the Karma unit tests are unable to deeply resolve
   * the promises in $httpProvider.interceptors.push('jwtInterceptor')
   *
   * This separate directives module works around that issue.
   */
  angular
    .module('user.directives', [
      'user.service.user.profile'
    ]);

})();
