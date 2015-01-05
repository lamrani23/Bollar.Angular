(function() {
    'use strict';


    angular
        .module('app.layout')
        .factory('notificationDataService', notificationDataService);

    /* @ngInject */
    function notificationDataService(dataservice) {


        var service = {
            getNotifications: getNotifications
        };
        function getNotifications() {
            return dataservice.get('app/layout/header/notification.data.json');
        }
        return service;


    }

})();

