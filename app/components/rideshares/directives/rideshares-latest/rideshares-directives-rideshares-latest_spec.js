(function () {
  'use strict';

  describe('Rideshares Directive', function () {

    describe('Rideshares Latest', function () {

      var scope,
        $httpBackend,
        elm;

      // Load the directives module
      beforeEach(module('rideshares.directives'));
      beforeEach(module('app.services', function ($provide) {
        $provide.factory('AppLocalStorageSvc', function($q) {
          return {
            getItem: function() {
              $q.when(0);
            },
            setItem: function() {
              $q.when(true);
            }
          }
        });
      }));

      // Load the test cached HTML templates
      beforeEach(module('templates'));

      // Load fixture data
      beforeEach(module('fixture/200-get-rideshares.json'));
      beforeEach(module('fixture/503-service-unavailable.json'));

      beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        elm = angular.element('<rsm-rideshares-latest/>');
        $compile(elm)(scope);
      }));

      it('should render the latest rideshares', function (done) {
        inject(function (fixture200GetRideshares) {

          // test
          $httpBackend.expectGET('/rideshares').respond(fixture200GetRideshares);

          // run it
          // compile
          scope.$apply();

          // http get
          $httpBackend.flush();

          scope.$apply();

          // test
          expect(angular.element(elm).text()).to.match(/Mountain\ View,\ CA,\ United\ States/);
          expect(angular.element(elm).text()).to.match(/Woody\ Point,\ Queensland,\ Australia/);

          done();

        });
      });

      it('should handle errors', function (done) {
        inject(function (fixture503ServiceUnavailable) {

          // test
          $httpBackend.expectGET('/rideshares').respond(503, fixture503ServiceUnavailable);

          // run it
          // compile
          scope.$apply();

          // http get
          $httpBackend.flush();

          // test
          expect(angular.element(elm).text()).to.match(/Service\ Unavailable/);

          done();

        });
      });

    });

  });

})();
