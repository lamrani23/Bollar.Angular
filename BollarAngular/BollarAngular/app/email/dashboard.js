(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function Dashboard($q, dataservice, logger) {

        /*jshint validthis: true */
        var vm = this;

      

        activate();

        function activate() {
            var promises = [];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

      
    }
})();
