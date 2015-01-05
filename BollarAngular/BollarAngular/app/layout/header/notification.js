(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('notification', notification);

  //  notification.$inject = ['$q', 'logger'];

/* @ngInject */
    function notification($q, logger, notificationDataService) {

        /*jshint validthis: true */
        var vm = this;


        activate();

        function activate() {
            var promises = [getNotifications()];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                logger.info('Activated notification View');
            });
        }

        function getNotifications() {
            notificationDataService.getNotifications().then(function(data) {
                vm.notification = data;
            });
        }


    }

})();

