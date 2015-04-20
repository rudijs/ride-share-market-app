(function () {
  'use strict';

  describe('App Routes Auth Policy', function () {

    var $rootScope, $scope, $location, JwtSvc;

    beforeEach(module('app.routes.auth.policy'));

    beforeEach(inject(function(_$rootScope_, _$location_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $location = _$location_;
    }));

    describe('Default Policy', function () {

      describe('Non Authenticated User', function () {

        beforeEach(inject(function(_JwtSvc_) {
          JwtSvc = _JwtSvc_;

          // stub out the JWT Manager promise
          var stubJwtSvc = function () {
            return {
              then: function (successCallback) {
                successCallback();
              }
            };
          };
          sinon.stub(JwtSvc, 'getUser', stubJwtSvc);

        }));

        it('should redirect to /signin', function () {

          $location.path('/');

          $rootScope.$broadcast('$stateChangeStart', {});

          expect($location.path()).to.equal('/signin');

        });

      });

      describe('Authenticated User', function () {

        beforeEach(inject(function(_JwtSvc_) {
          JwtSvc = _JwtSvc_;

          // stub out the JWT Manager promise
          var stubJwtSvc = function () {
            return {
              then: function (successCallback) {
                successCallback({_id: 'abc123', email: 'net@citizen.com'});
              }
            };
          };
          sinon.stub(JwtSvc, 'getUser', stubJwtSvc);

        }));

        it('should not redirect to /signin', function () {

          $location.path('/');

          $rootScope.$broadcast('$stateChangeStart', {});

          expect($location.path()).to.equal('/');

        });

      });

    });

  });

})();
