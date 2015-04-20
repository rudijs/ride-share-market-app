(function () {
  'use strict';

  function SignOutCtrl($timeout, $location, JwtSvc) {

    JwtSvc.removeJwt().then(function success() {
      $timeout(function () {
        $location.path('/');
      }, 1250);
    });

  }

  angular
    .module('users')
    .controller('SignOutCtrl', SignOutCtrl);

})();
