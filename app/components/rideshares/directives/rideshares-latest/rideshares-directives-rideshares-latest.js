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

  function RidesharesLatestCtrl($scope, $q, RidesharesGetSvc, AppLocalStorageSvc) {

    var vm = this;

    vm.ready = false;

    // angular-table pagination
    vm.config = {
      itemsPerPage: 5,
      fillLastPage: true,
      currentPage: 0
    };

    vm.getLatestRideshares = function () {

      // Pagination options
      // http://samu.github.io/angular-table/examples/examples.html
      // or
      // https://github.com/michaelbromley/angularUtils

      $q.all([
        RidesharesGetSvc.getLatest(),
        AppLocalStorageSvc.getItem('rsmLatestCurrentPage')
      ])
        .then(
        function (res) {
          vm.rideshares = res[0];
          vm.config.currentPage = res[1] || 0;
        },
        function (err) {
          // Errors from 1st promise
          vm.errors = err.data.errors;
          // TODO: Errors from local storage lookup
        })
        .finally(function () {
          vm.ready = true;
        });

    };

    // Watch the pagination current page and save to local storage
    // This is useful if the user goes several pages into the angular-table data, clicks into, then goes back.
    $scope.$watch(function () {
      return vm.config.currentPage;
    }, function (newVal) {
      AppLocalStorageSvc.setItem('rsmLatestCurrentPage', newVal);
    });

  }

})(angular.module('rideshares.directives'));
