(function () {
  'use strict';

  /**
   * Route Auth Policy: default all routes require the user to be signed in.
   *
   * Public non-authenticated routes require 'data: { noAuth: true }'
   *
   * This policy will cascade down into other routes in other components
   *
   */
  angular.module('app.routes.auth.policy', ['users'])
    .run(function ($rootScope, $location, JwtSvc) {

      // is authentication is required for this route
      var isAuthRequired = function (toState) {
        return (toState.data && toState.data.noAuth) ? false : true;
      };

      $rootScope.$on('$stateChangeStart', function () {

        // if route requires auth and user is not logged in
        if (isAuthRequired(arguments[1])) {

          // redirect back to login
          JwtSvc.getUser().then(function success(user) {
            if (!user) {
              $location.path('/signin');
            }
          });
        }

      });

    });

})();
