(function () {
  'use strict';

  angular.module('app.services')
    .factory('NavTopReadySvc', function() {
      return {
        ready: false
      };
    });

})();
