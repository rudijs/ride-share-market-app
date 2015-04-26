(function () {
  'use strict';

  angular
    .module('rideshares', [
      'restangular',
      'angular-jwt',
      'ngAutocomplete',
      'rideshares.routes',
      'rideshares.directives'
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
        var injector = angular.injector(['users.services', 'ng']);
        var JwtSvc = injector.get('JwtSvc');
        return JwtSvc.getJwt().then(function getJwtSuccess(token) {
          return token;
        });
      };
      $httpProvider.interceptors.push('jwtInterceptor');

    });

  /**
   * All the directives for the rideshares component in separate module.
   *
   * The reason is for testability.
   * LocalForage is used in the main rideshares-app.js file, the Karma/Jasmine unit tests are unable to deeply resolve
   * the promises in $httpProvider.interceptors.push('jwtInterceptor')
   *
   * This separate directives module works around that issue.
   */
  angular
    .module('rideshares.directives', [
      'rideshares.service.rideshares.get',
      'rideshares.service.rideshares.create',
      'angular-table'
    ]);

})();
