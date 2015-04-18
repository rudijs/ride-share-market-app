(function () {
  'use strict';

  angular
    .module('user.directives')
    .controller('UserProfileCtrl', UserProfileCtrl)
    .directive('rsmUserProfile', function () {
      return {
        restrict: 'E',
        scope: {
          userId: '@'
        },
        templateUrl: 'components/user/directives/user-profile/user-directive-user-profile.html',
        controller: 'UserProfileCtrl',
        controllerAs: 'user',
        bindToController: true
      };
    });

  function UserProfileCtrl(UserProfileSvc) {

    var vm = this;

    vm.ready = false;

    UserProfileSvc.getProfileById(vm.userId).then(
      function (res) {
        vm.profile = res;
      },
      function (err) {
        vm.error = err;
      })
      .finally(function () {
        vm.ready = true;
      });

  }

})();
