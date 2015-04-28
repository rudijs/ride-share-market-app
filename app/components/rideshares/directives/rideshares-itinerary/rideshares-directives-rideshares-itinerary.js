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
          onSave: '&',
          isOwner: '=?',
          onRemove: '&?'
        },
        templateUrl: 'components/rideshares/directives/rideshares-itinerary/rideshares-directives-rideshares-itinerary.html',
        controller: 'RidesharesItineraryCtrl',
        controllerAs: 'vm',
        bindToController: true
      };
    });

  function RidesharesItineraryCtrl($scope) {

    var vm = this;

    // We want to only use the exact input value from a google place lookup
    // If the user alters the google place (vm.place) selection in the UI place form input
    // this watch will set placeDetails to null which will disable the Add place button in the UI.
    $scope.$watch(
      function (scope) {
        return scope.vm.place;
      },
      function (newValue, oldValue) {
        if (vm.placeDetails) {
          if (newValue !== oldValue) {
            vm.placeDetails = null;
          }
        }
      });

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

    vm.remove = function () {
      vm.onRemove();
    };

    vm.types = ['Wanted', 'Offering'];
    vm.itinerary.type = vm.itinerary.type || vm.types[0]; // wanted

    vm.trips = ['One-way', 'Round trip'];
    vm.itinerary.trip = vm.itinerary.trip || vm.trips[0]; // One-way

    vm.frequencies = [
      'One time',
      'Daily',
      'Weekly',
      'Occasional',
      'Regular',
      'Often'
    ];
    vm.itinerary.frequency = vm.itinerary.frequency || vm.frequencies[0]; // One Time

    vm.vehicleTypes = [
      'Car',
      'Taxi',
      'Van',
      'Truck',
      'Vessel'
    ];
    vm.itinerary.vehicle = vm.itinerary.vehicle || vm.vehicleTypes[0]; // Car

    vm.seats = [1,2,3,4,5,6,7,8,9,10];
    vm.itinerary.seats = vm.itinerary.seats || vm.seats[0]; // 1

    vm.luggage = [
      'None',
      'Small Amount',
      'Backpack',
      'Suitcase',
      'Sports Equipment',
      'Larger'
    ];
    vm.itinerary.luggage = vm.itinerary.luggage || vm.luggage[1]; // Small Amount

    vm.shareDriving = [
      {label: 'Yes', value: 'Yes'},
      {label: 'No', value: 'No'}
    ];
    vm.itinerary.shareDriving = vm.itinerary.shareDriving || vm.shareDriving[1].value; // No

    vm.smoking = [
      {label: 'Yes', value: 'Yes'},
      {label: 'No', value: 'No'}
    ];
    vm.itinerary.smoking = vm.itinerary.smoking || vm.smoking[1].value; // No


  }


})(angular.module('rideshares.directives'));