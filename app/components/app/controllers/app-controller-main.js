(function () {
  'use strict';

  function MainCtrl() {
    //$scope.ready = TopBarReady.ready;
    this.greeting = 'Hello World';
  }

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

})();