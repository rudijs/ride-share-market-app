(function() {
  'use strict';

  function JwtSvc($rootScope, $localForage) {

    var jwtKeyName = 'jwt';

    function emit(message) {
      $rootScope.$emit(message);
    }

    function setItem(key, value) {
      return $localForage.setItem(key, value);
    }

    function saveJwt(jwt) {
      if (/^http/.test(jwt)) {
        jwt = jwt.split('=')[1];
      }
      return setItem(jwtKeyName, jwt);
    }

    function getJwt() {
      return $localForage.getItem(jwtKeyName);
    }

    function getUser() {

      return $localForage.getItem(jwtKeyName).then(function success(data) {

        if (!data) {
          return null;
        }

        var jwtParts = data.split('.');

        var claims = jwtParts[1];

        return JSON.parse(atob(claims));
      });

    }

    function removeJwt() {
      emit('user.signout');
      return $localForage.removeItem(jwtKeyName);
    }

    return {
      saveJwt: saveJwt,
      getJwt: getJwt,
      getUser: getUser,
      removeJwt: removeJwt
    };

  }

  angular
    .module('user.service.jwt.manager', ['user.service.local.storage'])
    .factory('JwtSvc', JwtSvc);

})();