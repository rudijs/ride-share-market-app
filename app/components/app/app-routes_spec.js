(function () {
  'use strict';

  describe('App Routes', function () {

    beforeEach(module('app.routes'));

    var $state;

    beforeEach(inject(function (_$state_) {
      $state = _$state_;
    }));

    it('should return all of the state configs', function (done) {

      var list = $state.get().sort(function (a, b) {
        return (a.name > b.name) - (b.name > a.name);
      });

      var names = [
        '', // implicit root state
        'about',
        'contact',
        'home',
        'privacy',
        'terms'
      ];

      expect(list.map(function (state) {
        return state.name;
      })).to.eql(names);

      done();

    });

  });

})();