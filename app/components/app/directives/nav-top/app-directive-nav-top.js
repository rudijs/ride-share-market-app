(function () {
  'use strict';

  angular.module('app.directives')
    .directive('rsmNavTop', function (NavTopLinksSvc, NavToggleSvc) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/app/directives/nav-top/app-directive-nav-top.html',
        link: function (scope) {
          scope.links = NavTopLinksSvc.urls;
          scope.toggleLeftMenu = NavToggleSvc.toggleLeftMenu;
        }
      };
    });

})();
