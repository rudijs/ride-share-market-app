(function () {
  'use strict';

  angular.module('app.directives')
    .directive('rsmNavTop', function (NavTopLinksSvc, NavTopReadySvc, NavToggleSvc) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/app/directives/nav-top/app-directive-nav-top.html',
        link: function (scope) {
          scope.links = NavTopLinksSvc.urls;
          scope.toggleLeftMenu = NavToggleSvc.toggleLeftMenu;
          // Menu is ready, use this is prevent the page re-aligning when the Top Bar <header> element is inserted.
          NavTopReadySvc.ready = true;
        }
      };
    });

})();
