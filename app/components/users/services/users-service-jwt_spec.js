(function () {
  'use strict';

  describe('Jwt Manager Service', function () {

    /**
     * This service uses angular-localForage, which uses localforage
     * So there's a localforage promise, then a angular $q promise - two/nested promises.
     * For the both to resolve in the tests, currently, it's best to use injector.get rather than beforeEach(module());
     *
     * Uses jasmine-as-promised runs() async testing method
     */

    var $rootScope,
      JwtSvc,
      spies;

    beforeEach(function () {
      inject(function () {
        var injector = angular.injector(['users.service.jwt.manager', 'ng']);

        JwtSvc = injector.get('JwtSvc');
        $rootScope = injector.get('$rootScope');

        spies = {
          signout: sinon.spy($rootScope, '$emit')
        };

      });
    });

    afterEach(function () {
      if ($rootScope.$emit.restore) {
        $rootScope.$emit.restore();
      }
    });

    it('should save a JWT Token from a URL', function (done) {

      return JwtSvc.saveJwt('http://abc.com?jwt=abc123').then(
        function success(data) {
          data.should.equal('abc123');

          // Save a jwt token direct
          return JwtSvc.saveJwt('def456').then(
            function success(data) {
              data.should.equal('def456');
              done();
            });
        })
        .catch(function (err) {
          throw('JwtSvc.saveJwt error' + err);
        });


    });

    it('should get a JWT token', function () {

      return JwtSvc.saveJwt('http://abc.com?jwt=abc123').then(
        function success(data) {
          data.should.equal('abc123');

          return JwtSvc.getJwt().then(
            function success(data) {
              data.should.equal('abc123');
            });
        })
        .catch(function (err) {
          throw('JwtSvc error' + err);
        });

    });

    describe('remove', function () {

      afterEach(function () {

        // Confirm angular rootScope emit/broadcast
        sinon.assert.calledWith(spies.signout, 'user.signout');
      });

      it('should remove a JWT token', function () {

        return JwtSvc.saveJwt('http://abc.com?jwt=abc123').then(
          function success(data) {
            data.should.equal('abc123');

            return JwtSvc.getJwt().then(
              function success(data) {
                data.should.equal('abc123');

                return JwtSvc.removeJwt().then(function success(data) {
                  expect(data).to.be.undefined;

                  return JwtSvc.getJwt().then(
                    function success(data) {
                      expect(data).to.be.undefined;
                    });
                });
              });
          })
          .catch(function (err) {
            throw('JwtSvc error' + err);
          });

      });

    });

    describe('get user', function () {

      it('should extract the user name from the JWT token', function () {

        var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQxMDI1NjAwMH0.Ei41EFuBKsE8igQ1sd1661TKGerNYN3FlndYKltG5RY';

        return JwtSvc.saveJwt(jwt).then(
          function success(data) {
            data.should.equal(jwt);

            return JwtSvc.getUser().then(
              function success(data) {
                data.name.should.equal('Test');
              });
          })
          .catch(function (err) {
            throw('JwtSvc error' + err);
          });

      });

      it('returns null if no JWT in local storage', function () {

        // First make sure no JWT for the getUser() test next
        return JwtSvc.removeJwt().then(function success() {
          return JwtSvc.getUser().then(
            function success(data) {
              expect(data).to.be.null;
            });
        })
          .catch(function (err) {
            throw('JwtSvc error' + err);
          });

      });

    });

  });

})();
