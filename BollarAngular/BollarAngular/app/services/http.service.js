(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('httpService', httpService);

    // deprecated
    /* @ngInject */
    function httpService($http, $q) {
     

        var service = {
            get: function (url) {
                var deferral = $q.defer();
                $http.get(url).then(function(httpresult) {
                    deferral.resolve(httpresult.data);
                });
                return $q.when(deferral.promise);
            },
            post: function (url,json) {
                var deferral = $q.defer();
                $http.post(url, json).then(function(httpresult) {
                    deferral.resolve(httpresult.data);
                });
                return $q.when(deferral.promise);
            },

        };

        return service;


    }

})();
