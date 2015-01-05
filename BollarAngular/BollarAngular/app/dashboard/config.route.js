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
                    //item: '<a href class="auto" ui-sref="app.dashboard"> ' +
                    //    '<span class="pull-right text-muted">' +
                    //    ' <i class="fa fa-fw fa-angle-right text"></i>' +
                    //    '<i class="fa fa-fw fa-angle-down text-active"></i>' +
                    //    '</span>' +
                    //    '<i class="glyphicon glyphicon-stats icon text-primary-dker"></i>' +
                    //    '<span class="font-bold" translate="aside.nav.DASHBOARD">Dashboard</span>' +
                    //    '</a>',
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
            }
        ];
    }

})();