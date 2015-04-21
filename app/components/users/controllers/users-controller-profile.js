(function (module) {
  'use strict';

  function UsersProfileCtrl($stateParams) {
    this.userId = $stateParams.id;
  }

  module.controller('UsersProfileCtrl', UsersProfileCtrl);

})(angular.module('users'));
