(function () {
  'use strict';

  angular.module('app.services')
    .factory('TopBarReady', function() {
      return {
        ready: false
      };
    });

})();
