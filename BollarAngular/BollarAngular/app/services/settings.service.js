(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('settingService', settingService);

    /* @ngInject */
    function settingService($rootScope, $localStorage, config) {
        var vm = this;
        vm.app = config.app;
        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            vm.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = vm.app.settings;
        }


        $rootScope.$watch('app.settings', function () {
            if (vm.app.settings.asideDock && vm.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                vm.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = vm.app.settings;
        }, true);

        var service = {
            appconfig: vm.app,
            config: config,
            settings: vm.app.settings,
        };

        return service;


    }

})();
