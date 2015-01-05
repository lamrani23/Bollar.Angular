(function() {
    'use strict';


    angular.module('app')
      .controller('AppCtrl', main);

    /* @ngInject */
    function main($scope, settingService) {
        // config
        $scope.app = settingService.appconfig;

      
    }
})();