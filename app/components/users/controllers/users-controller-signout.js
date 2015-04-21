(function (module) {
  'use strict';

  function SignOutCtrl($timeout, $location, JwtSvc) {

    JwtSvc.removeJwt().then(function success() {
      $timeout(function () {
        $location.path('/');
      }, 1250);
    });

  }

  module.controller('SignOutCtrl', SignOutCtrl);

})(angular.module('users'));
