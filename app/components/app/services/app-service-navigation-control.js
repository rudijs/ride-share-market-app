(function () {
  'use strict';

  angular.module('app.services')
    .factory('NavigationSvc', NavigationSvc);

  function NavigationSvc($mdSidenav) {

    function toggleLeftMenu() {
      $mdSidenav('left').toggle();
    }

    return {
      toggleLeftMenu: toggleLeftMenu
    };
  }

})();
