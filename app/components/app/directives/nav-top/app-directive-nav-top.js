(function () {
  'use strict';

  angular.module('app')
    .directive('rsmNavTop', function (TopBarLinks, TopBarReady, NavigationSvc) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/app/directives/nav-top/app-directive-nav-top.html',
        link: function (scope) {
          scope.links = TopBarLinks.urls;
          scope.toggleLeftMenu = NavigationSvc.toggleLeftMenu;
          // Menu is ready, use this is prevent the page re-aligning when the Top Bar <header> element is inserted.
          TopBarReady.ready = true;
        }
      };
    });

})();
