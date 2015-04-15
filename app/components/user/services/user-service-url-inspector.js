(function () {
  'use strict';

  function UrlInspectorSvc() {

    var jwt;

    function checkJwt(absUrl) {
      if (/jwt/.test(absUrl)) {
        jwt = absUrl.split('=')[1];
      }
      return jwt;
    }

    return {
      checkJwt: checkJwt
    };

  }

  angular
    .module('user.service.url.inspector', [])
    .factory('UrlInspectorSvc', UrlInspectorSvc);

})();
