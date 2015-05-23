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

  function RidesharesLatestCtrl($scope, $q, $mdMedia, RidesharesGetSvc, AppLocalStorageSvc, RidesharesWebWorkerSvc) {

    var vm = this;

    vm.ready = false;

    vm.pagination = {
      current: 1
    };

    vm.getLatestRideshares = function () {

      $q.all([
        RidesharesGetSvc.getLatest(),
        AppLocalStorageSvc.getItem('rsmLatestCurrentPage')
      ])
        .then(
        function (res) {

          vm.pagination = {
            current: res[1] || 0
          };

          //vm.rideshares = res[0];
          //return RidesharesSortLatestSvc.sortRideshares(res[0]).then(function(res) {
          return RidesharesWebWorkerSvc.sorter(res[0]).then(function(res) {
            vm.rideshares = res;
          });

        },
        function (err) {
          // Errors from 1st promise
          vm.errors = err.data.errors;
          // TODO: Errors from local storage lookup
        })
        .then(function () {
          vm.ready = true;
        });

    };

    // Watch the pagination current page and save to local storage
    // This is useful if the user goes several pages into the angular-table data, clicks into, then goes back.
    $scope.$watch(function () {
      return vm.pagination.current;
    }, function (newVal) {
      AppLocalStorageSvc.setItem('rsmLatestCurrentPage', newVal);
    });

    vm.isSmall = function() {
      return $mdMedia('gt-sm');
    };

  }

})(angular.module('rideshares.directives'));
