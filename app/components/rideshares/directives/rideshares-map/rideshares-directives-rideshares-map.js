(function () {
  'use strict';

  angular
    .module('rideshares.directives')

    .controller('GoogleMapDirectionsCtrl', GoogleMapDirectionsCtrl)

    .directive('rsmRidesharesMap', function () {
      return {
        restrict: 'E',
        scope: {
          route: '=',
          isRouteValid: '=?'
        },
        controller: 'GoogleMapDirectionsCtrl',
        controllerAs: 'googleMap',
        bindToController: true,
        template: '<div id="map-canvas"></div>'
      };
    });

  function GoogleMapDirectionsCtrl($scope, $window, $q) {

    var vm = this;

    // Global dependencies
    var google = $window.google,
      _ = $window._;

    $scope.$watchCollection(function () {
      return vm.route;
    }, function (newValue, oldValue) {

      if (!angular.equals(newValue, oldValue)) {

        if (newValue.length < 2) {
          return;
        }

        console.log(newValue, oldValue);

        var values = googleMapValues(google, _, newValue);

        // If the route is valid render the google map
        calcRoute($q, google, values).then(
          function calcRouteSuccess(route) {
            vm.isRouteValid = true;
            initializeGoogleMap(google, values.mapCenter, route);
          },
          function calcRouteError() {
            vm.isRouteValid = false;
          }
        );

      }

    });

  }

  function calcRoute($q, _google_, values) {

    var deferred = $q.defer();

    var google = _google_;

    var directionsService = new google.maps.DirectionsService();

    var request = {
      origin: values.origin,
      destination: values.destination,
      waypoints: values.waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        deferred.resolve(response);
      }
      else {
        deferred.reject(status);
      }
    });

    return deferred.promise;

  }

  function initializeGoogleMap(_google_, mapCenter, route) {

    var google = _google_;

    var directionsDisplay = new google.maps.DirectionsRenderer();

    var mapOptions = {
      zoom: 8,
      center: mapCenter
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    directionsDisplay.setMap(map);

    directionsDisplay.setDirections(route);

  }

  function googleMapValues(_google_, ___, newValue) {

    var google = _google_,
      _ = ___;

    // lodash _.pluck shorthand
    var places = _.map(newValue, 'place');

    // Get the 1st stop for the origin
    var origin = places.shift();

    // Get the last stop as the destination
    var destination = places.pop();

    // Everything in between are the stopover waypoints
    var waypoints = [];

    // If there is only two stops it's OK to submit the wayPoints array empty
    _.forEach(places, function (place) {
      var waypoint = {
        location: place,
        stopover: true
      };
      waypoints.push(waypoint);
    });

    // Extract the geo coordinates from the 1st stop
    var obj = newValue[0].details.geometry.location;
    var latitude = obj[Object.keys(obj)[1]];
    var longitude = obj[Object.keys(obj)[0]];

    // Set the google map center with these coordinates
    var mapCenter = new google.maps.LatLng(latitude, longitude);

    return {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      mapCenter: mapCenter
    };

  }

})();
