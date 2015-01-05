(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('headerController', headerController);

    headerController.$inject = ['$q', 'logger', 'headerDataService'];

    function headerController($q, logger, headerDataService) {

        /*jshint validthis: true */
        var vm = this;


        activate();

        function activate() {
            var promises = [getHeaderMenuItems()];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                //logger.info('Activated header View');
            });
        }


        function getHeaderMenuItems() {
            return headerDataService.getHeaderMenuItems().then(function (data) {
                return vm.menuData = data;
            });
        }

    }

})();
