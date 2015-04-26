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

      // Pagination options
      // http://samu.github.io/angular-table/examples/examples.html
      // or
      // https://github.com/michaelbromley/angularUtils

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

    // angular-table pagination
    vm.config = {
      itemsPerPage: 5,
      fillLastPage: true
    };

  }


})(angular.module('rideshares.directives'));
