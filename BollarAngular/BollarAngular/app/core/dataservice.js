(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
            get: get,
            post: post,
            ready: ready
        };

        return service;

        function get(url) {
            return $http.get(url)
                .then(getComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed')(message);
                    $location.url('/');
                });

            function getComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function post(url,json) {
            return $http.post(url,json)
                .then(getComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed ')(message);
                    $location.url('/');
                });

            function getComplete(data, status, headers, config) {
                return data.data;
            }
        }

        

     

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
