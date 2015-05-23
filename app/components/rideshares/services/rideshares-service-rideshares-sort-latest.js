(function (module) {
  'use strict';

  module.factory('RidesharesSortLatestSvc', RidesharesSortLatestSvc);

  function RidesharesSortLatestSvc($q, WEB_WORKERS) {

    function sortRideshares(data) {

      var worker = new Worker(WEB_WORKERS.worker);

      var deferred = $q.defer();

      worker.addEventListener('message', function (e) {
        console.log(e.data);
        deferred.resolve(e.data);
        worker.terminate();
      });

      worker.postMessage(data);

      return deferred.promise;

    }

    return {
      sortRideshares: sortRideshares
    };

  }

})(angular.module('rideshares.services'));
