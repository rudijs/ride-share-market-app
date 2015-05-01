(function (module) {
  'use strict';

  module.controller('WelcomeCtrl', WelcomeCtrl);

  function WelcomeCtrl($location, $window, UrlInspectorSvc, JwtSvc) {

    // Ex:
    // http://local.ridesharemarket.com:3000/#!/welcome?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQwOTg4NzM0MH0.90p7HsF59e8qds4F-YQfckMKfy_cA5bcnub6EmZEAQw

    var jwtUrlToken = UrlInspectorSvc.checkJwt($location.absUrl());

    if (jwtUrlToken) {
      JwtSvc.saveJwt(jwtUrlToken).then(function success() {
        $window.location.href = '/';
      });
    }

  }

})(angular.module('users'));
