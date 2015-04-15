(function () {
  'use strict';

  angular.module('app.services')
    .factory('NavToggleSvc', NavToggleSvc);

  function NavToggleSvc($mdSidenav) {

    function toggleLeftMenu() {
        $mdSidenav('left').toggle();
    }

    return {
      toggleLeftMenu: toggleLeftMenu
    };
  }

})();
