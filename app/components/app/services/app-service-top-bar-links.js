(function () {
  'use strict';

  angular.module('app.services')
    .factory('TopBarLinks', function () {
      return {
       urls: [
         {
           text: 'Google',
           url: 'http://google.com'
         },
         {
           text: 'Yahoo',
           url: 'http://yahoo.com'
         }
       ]
      };
    });

})();
