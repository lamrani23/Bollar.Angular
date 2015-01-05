(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Navigator', Navigator);

//    Navigator.$inject = ['$q', 'logger'];

/* @ngInject */
    function Navigator($q, logger,routehelper) {

        /*jshint validthis: true */
        var vm = this;
        vm.routes = routehelper.all();

        activate();

        function activate() {
            var promises = [];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                logger.info('Activated Navigator View');
            });
        }


    }

})();
