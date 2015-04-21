(function (module) {
  'use strict';

  module
    .controller('RidesharesLatestCtrl', RidesharesLatestCtrl)
    .directive('rsmRidesharesLatest', function () {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/rideshares/directives/rideshares-latest/rideshares-directives-rideshares-latest.html',
        controller: 'RidesharesLatestCtrl as latest',
        link: function (scope, element, attrs, ctrl) {
          ctrl.getLatestRideshares();
        }
      };
    });

  function RidesharesLatestCtrl(RidesharesGetSvc) {

    var vm = this;

    vm.ready = false;

    vm.getLatestRideshares = function () {

      // TODO: pagination
      // https://github.com/michaelbromley/angularUtils

      RidesharesGetSvc.getLatest().then(
        function (res) {
          vm.rideshares = res;
          //$scope.rideshares = RideshareUtils.filterRideshareList(res);
        },
        function (err) {
          console.log(err);
          console.log(err.data.errors);
          vm.errors = err.data.errors;
        }
      )
        .finally(function () {
          vm.ready = true;
        });

    };

  }


})(angular.module('rideshares.directives'));
