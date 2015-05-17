(function () {
  'use strict';

  /**
   * @param {event} e - The data property needs to be typeof Array
   */
  self.addEventListener('message', function (e) {


    var items = e.data.map(function (item) {
      return {
        _id: item._id,
        origin: item.itinerary.route[0].place,
        destination: item.itinerary.route[item.itinerary.route.length - 1].place,
        waypoints: item.itinerary.route.length - 2,
        updated_at: item.updated_at
      };
    });

    self.postMessage(items);

  }, false);

})();
