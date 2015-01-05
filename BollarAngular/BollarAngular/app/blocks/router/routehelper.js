(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', 'logger', 'routehelperConfig'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, logger, routehelperConfig) {
       var $stateProvider = angular.module('blocks.router').$stateProvider;
       var $urlRouterProvider = angular.module('blocks.router').$urlRouterProvider;
       var $stateParams = angular.module('blocks.router').$stateParams;
       var $state = angular.module('blocks.router').$state;
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        //var $routeProvider = routehelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            $stateProvider:$stateProvider,
            $urlRouterProvider: $urlRouterProvider,
            $stateParams: $stateParams,
            $state: $state,
            all:all,
            routeCounts: routeCounts
        };

        init();

        return service;
        ///////////////

        function all() {
           return _($state.get()).reject({ abstract: true });
        }
        function configureRoutes(routes) {
            routes.forEach(function (route) {
                $stateProvider
                    .state(route.state, route.options);
                //route.config.resolve =
                //    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                //$routeProvider.when(route.url, route.config);

            });
            //$routeProvider.otherwise({redirectTo: '/'});
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function(event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
})();
