(function () {
  'use strict';

  function MainCtrl($mdDialog) {
    //$scope.ready = TopBarReady.ready;
    this.greeting = 'Hello World';

    this.showDialog = function showDialog($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        template: '<md-dialog aria-label="List dialog">' +
        '  <md-content>' +
        '    <md-list>' +
        '      <md-item>' +
        '       <p>This is a Message</p>' +
        '      </md-item>' +
        '    </md-list>' +
        '  </md-content>' +
        '  <div class="md-actions">' +
        '    <md-button ng-click="closeDialog()">' +
        '      Close Dialog' +
        '    </md-button>' +
        '  </div>' +
        '</md-dialog>',
        controller: DialogController
      });
      function DialogController(scope, $mdDialog) {
        scope.closeDialog = function () {
          $mdDialog.hide();
        };
      }
    };

  }

    angular
      .module('app')
      .controller('MainCtrl', MainCtrl);

  }

  )
  ();