(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'app.dashboard',

                options: {
                    url: '/dashboard',
                    templateUrl: 'app/dashboard/dashboard.html',
                    category: 'Navigation',
                    // item:
                    itemTemplate:'app/dashboard/item.html',
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/chart.js']);
                            }
                        ]
                    }
                }
            },
               {
                   state: 'app.dashboard.v1',

                   options: {
                       url: '/dashboard',
                       templateUrl: 'app/dashboard/dashboard.html',
                       parentState: 'app.dashboard',
                       category: 'Navigation',
                       // item:
                       item: '<a ui-sref="app.dashboard" > <span translate="Dashboard">Dashboard</span></a>',
                       resolve: {
                           deps: [
                               '$ocLazyLoad',
                               function ($ocLazyLoad) {
                                   return $ocLazyLoad.load(['js/controllers/chart.js']);
                               }
                           ]
                       }
                   }
               }
        ];
    }

})();