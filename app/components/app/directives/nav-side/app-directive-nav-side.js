(function () {
  'use strict';

  angular.module('app')
    .directive('rsmNavSide', function (TopBarLinks, NavigationSvc) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/app/directives/nav-side/app-directive-nav-side.html',
        link: function(scope) {
          scope.links = TopBarLinks.urls;
          scope.toggleLeftMenu = NavigationSvc.toggleLeftMenu;
        }
      };
    });

})();
