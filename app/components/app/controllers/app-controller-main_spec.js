(function () {
  'use strict';

  describe('App Controller Main', function () {

    var $scope;

    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $controller) {

      $scope = $rootScope.$new();

      $controller('MainCtrl as vm', {
        $scope: $scope
      });

    }));

    it('should be true', function (done) {
      expect($scope.vm.greeting).to.equal('Hello World');
      done();
    });

  });

})();
