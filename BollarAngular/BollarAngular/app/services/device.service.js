(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('deviceService', deviceService);


    /* @ngInject */
    function deviceService($window) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');


          function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

        var service = {
            isSmartDevice: function () { return isSmartDevice($window); },
            isIE: function () { return isIE; },

        };

        return service;


    }

})();
