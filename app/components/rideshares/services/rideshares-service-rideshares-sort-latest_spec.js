(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Sort Latest', function () {

      beforeEach(module('rideshares.services', function ($provide) {
        $provide.constant('WEB_WORKERS', {
          worker: 'base/app/components/webworkers/worker.js'
        });
      }));

      var $scope,
        RidesharesSortLatestSvc;

      // because I use multiple promises and $apply only trigger's one digest -  works (but it's very dirty).
      var triggerDigests = function () {
          return setInterval(function () {
            $scope.$digest();
          }, 10);
        };

      beforeEach(inject(function ($rootScope, _RidesharesSortLatestSvc_) {
        $scope = $rootScope.$new();
        RidesharesSortLatestSvc = _RidesharesSortLatestSvc_;
      }));

      it('should sort rideshares', function (done) {

        RidesharesSortLatestSvc.sortRideshares([1,2,3]).then(function (res) {
          console.log('res', res);
          done();
        });

        triggerDigests();

      });

    });

  });

})();
