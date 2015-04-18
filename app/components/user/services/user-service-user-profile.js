(function () {
  'use strict';

  var UserProfileSvc = function UserProfileSvc($q, Restangular) {

    var getProfileById = function getProfileById(userId) {

      var deferred = $q.defer();

      // TODO: restrict data fetched (ie. do not transmit email address)
      Restangular.one('users').one(userId).get().then(
        function success(res) {
          deferred.resolve(res.users[0]);
        },
        function error(err) {
          deferred.reject(err.data.errors);
        }
      );

      return deferred.promise;
    };

    return {
      getProfileById: getProfileById
    };

  };

  angular.module('user.service.user.profile', [
    'restangular'
  ])
    .factory('UserProfileSvc', UserProfileSvc);

})();
