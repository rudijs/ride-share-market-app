(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Sort Latest', function () {

      beforeEach(module('rideshares.services', function ($provide) {
        $provide.constant('WEB_WORKERS', {
          worker: '/base/app/components/webworkers/worker.js'
        });
      }));

      // Load fixture data
      beforeEach(module('fixture/200-get-rideshares.json'));

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

        inject(function (fixture200GetRideshares) {

          var rideshares = fixture200GetRideshares.rideshares;

          RidesharesSortLatestSvc.sortRideshares(rideshares).then(function (res) {
            res[0].origin.should.equal(fixture200GetRideshares.rideshares[0].itinerary.route[0].place);
            res[0].destination.should.equal(fixture200GetRideshares.rideshares[0].itinerary.route[1].place);
            done();
          });

          triggerDigests();

        });

      });

    });

  });

})();
