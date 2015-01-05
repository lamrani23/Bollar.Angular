(function() {
    'use strict';


    angular.module('app.layout')
      .controller('AppCtrl', main);

    /* @ngInject */
    function main($scope, translateService, settingService) {
        // config
        $scope.app = settingService.appconfig;

        // angular translate
        $scope.lang = translateService.lang;
        $scope.langs = translateService.langs;
        $scope.selectLang = translateService.selectLang;
        $scope.setLang = translateService.setLang;
    }
})();