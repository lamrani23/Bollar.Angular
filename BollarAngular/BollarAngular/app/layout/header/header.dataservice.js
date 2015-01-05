(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('headerDataService', headerDataService);

    /* @ngInject */
    function headerDataService(httpService) {


        var service = {
            getHeaderMenuItems: getHeaderMenuItems,
    };

        function getHeaderMenuItems() {
            return httpService.get('app/layout/header/header.data.json');
        }

        return service;


    }

})();
