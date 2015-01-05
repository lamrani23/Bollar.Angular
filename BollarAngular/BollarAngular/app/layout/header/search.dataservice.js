(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('searchDataService', searchDataService);

    /* @ngInject */
    function searchDataService(dataservice) {
        

        var service = {
            getSearchTerms: getSearchTerms
        };
        function getSearchTerms(filter) {
            return dataservice.get('app/layout/header/search.data.json');
        }
        return service;

      
    }

})();
