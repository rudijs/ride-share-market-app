(function () {
  'use strict';

  function UsersProfileCtrl($stateParams) {
    this.userId = $stateParams.id;
  }

  angular
    .module('users')
    .controller('UsersProfileCtrl', UsersProfileCtrl);

})();
