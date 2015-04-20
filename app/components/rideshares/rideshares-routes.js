(function () {
  'use strict';

  angular
    .module('rideshares.routes', ['ui.router'])
    .config(function($stateProvider) {

      $stateProvider

        .state('create', {
          url: '/rideshares/create',
          templateUrl: 'components/rideshares/templates/rideshares-template-rideshare-create.html'
        })

        .state('update', {
          url: '/rideshares/{rideshareId:[0-9a-fA-F]{24}}/update',
          templateUrl: 'components/rideshares/templates/rideshares-template-rideshare-update.html',
          controller: 'RideshareCtrl',
          controllerAs: 'vm'
        })

        .state('show', {
          url: '/rideshares/{rideshareId:[0-9a-fA-F]{24}}',
          templateUrl: 'components/rideshares/templates/rideshares-template-rideshare.html',
          controller: 'RideshareCtrl',
          controllerAs: 'rideshare',
          data: {noAuth: true}
        });

    });

})();

