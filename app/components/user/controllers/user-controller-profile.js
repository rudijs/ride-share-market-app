(function () {
  'use strict';

  function UsersProfileCtrl($stateParams) {
    this.userId = $stateParams.id;
  }

  angular
    .module('user')
    .controller('UsersProfileCtrl', UsersProfileCtrl);

})();
