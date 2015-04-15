(function () {
  'use strict';

  angular.module('app.directives')
    .directive('rsmNavSigninSignout', function (JwtSvc, NavToggleSvc) {
      return {
        restrict: 'E',
        templateUrl: 'components/app/directives/nav-signin-signout/app-directive-nav-signin-signout.html',
        link: function (scope) {

          var defaultUser = {name: 'Guest'};

          scope.user = defaultUser;

          scope.isSignedIn = function () {
            return (scope.user.name !== defaultUser.name) ? true : false;
          };

          JwtSvc.getUser().then(function (user) {
            if (user) {
              scope.user = user;
            }
          });

          // JwtSvc will $emit 'user.signout' on the rootScope on user sign out
          // Reset the user which will reset the navigations to non-logged in.
          scope.$parent.$on('user.signout', function () {
            scope.user = defaultUser;
          });

          scope.toggleLeftMenuOnSign = function () {
            // Only toggle left side menu if we are in nav side (not on nav top)
            if (scope.toggleOnSignInOut) {
              NavToggleSvc.toggleLeftMenu();
            }
          };

        }
      };
    });

})();
