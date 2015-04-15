(function () {
  'use strict';

  describe('User Routes', function () {

    beforeEach(module('user.routes'));

    var $state;

    beforeEach(inject(function (_$state_) {
      $state = _$state_;
    }));

    it('should return all of the state configs', function (done) {

      var list = $state.get().sort(function (a, b) {
        return (a.name > b.name) - (b.name > a.name);
      });

      list.sort();

      var names = [
        '', // implicit root state
        'signin',
        'signout',
        'welcome'
      ].sort();

      expect(list.map(function (state) {
        return state.name;
      })).to.eql(names);

      done();

    });

  });

})();