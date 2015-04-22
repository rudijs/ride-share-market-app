(function (module) {
  'use strict';

  module
    .controller('RidesharesItineraryCtrl', RidesharesItineraryCtrl)
    .directive('rsmRidesharesItinerary', function () {
      return {
        restrict: 'E',
        scope: {
          itinerary: '=',
          isRouteValid: '=?',
          onSave: '&'
        },
        templateUrl: 'components/rideshares/directives/rideshares-itinerary/rideshares-directives-rideshares-itinerary.html',
        controller: 'RidesharesItineraryCtrl',
        controllerAs: 'vm',
        bindToController: true
      };
    });

  function RidesharesItineraryCtrl() {

    var vm = this;

    vm.addPlace = function () {

      // check we have text in the form input and google place autocomplete
      // TODO: check place and placeDetails have some similar words to avoid user manual mismatching (Array.every|some test)
      if (!vm.place || !vm.placeDetails) {
        return;
      }

      /**
       * place is the human readable place name/title the user selected from Google Places
       * details is an object of place data from Google Places
       *
       * @type {{place: string, details: ()}}
       */
      var location = {
        place: vm.place,
        details: vm.placeDetails
      };

      vm.itinerary.route.push(location);

      // reset google place
      vm.place = '';
      vm.placeDetails = null;

      console.log(vm.itinerary);

    };

    // Call the onSave callback
    vm.save = function () {
      vm.onSave();
    };

  }


})(angular.module('rideshares.directives'));