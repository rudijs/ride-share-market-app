(function (module) {
  'use strict';

  module
    .controller('RidesharesLatestCtrl', RidesharesLatestCtrl)
    .directive('rsmRidesharesLatest', function () {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/rideshares/directives/rideshares-latest/rideshares-directives-rideshares-latest.html',
        controller: 'RidesharesLatestCtrl as vm',
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
      // or
      // http://samu.github.io/angular-table/examples/examples.html

      RidesharesGetSvc.getLatest().then(
        function (res) {
          vm.rideshares = res;
          //$scope.rideshares = RideshareUtils.filterRideshareList(res);
        },
        function (err) {
          vm.errors = err.data.errors;
        }
      )
        .finally(function () {
          vm.ready = true;
        });

    };

    vm.config = {
      itemsPerPage: 5,
      fillLastPage: true
    };

  }


})(angular.module('rideshares.directives'));
