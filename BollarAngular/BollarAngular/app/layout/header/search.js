(function() {
    'use strict';

    angular.module('app.layout').controller('Search', ['$scope', '$http', function ($scope, $http) {
       
        // Any function returning a promise object can be used to load values asynchronously
        $scope.getLocation = function (val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function (res) {
                var addresses = [];
                angular.forEach(res.data.results, function (item) {
                    addresses.push(item.formatted_address);
                });
                return addresses;
            });
        };
    }])
})();

(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Search', Search);

   // Search.$inject = ['$q', 'logger'];

/* @ngInject */
    function Search($q,$scope,searchDataService, logger) {

        /*jshint validthis: true */
        var vm = $scope;
        vm.selected = undefined;
        
       

        activate();

        function activate() {
            var promises = [getSearchTerms()];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                logger.info('Activated Search View');
            });
        }
        function getSearchTerms() {
            return searchDataService.getSearchTerms(vm.selected).then(function (data) {
                return vm.states = data;
            });
        }

    }

})();
