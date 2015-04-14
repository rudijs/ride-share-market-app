(function () {
  'use strict';

  angular.module('app.services')
    .factory('NavTopLinksSvc', function () {
      return {
       urls: [
         {
           text: 'Home',
           url: '#!/'
         },
         {
           text: 'About Us',
           url: '#!/about'
         },
         {
           text: 'Privacy Policy',
           url: '#!/privacy'
         },
         {
           text: 'Terms',
           url: '#!/terms'
         },
         {
           text: 'Contact Us',
           url: '#!/contact'
         }
       ]
      };
    });

})();
