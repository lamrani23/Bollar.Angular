(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[NG-SGDP Error] ', //Configure the exceptionHandler decorator
        appTitle: 'SGDP',
        appTitleSmall: 'SGDP',

        version: '1.0.0'
    };

    config.app = {
        name: config.appTitle,
        version: config.version,
        // for chart colors
        color: {
            primary: '#7266ba',
            info: '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger: '#f05050',
            light: '#e8eff0',
            dark: '#3a3f51',
            black: '#1c2b36'
        },
        settings: {
            themeID: 1,
            navbarHeaderColor: 'bg-black',
            navbarCollapseColor: 'bg-white-only',
            asideColor: 'bg-black',
            headerFixed: true,
            asideFixed: false,
            asideFolded: false,
            asideDock: false,
            container: false
        }
    };

    core.value('config', config);

    core.config(configure);

    // todo change the router
    configure.$inject = ['$logProvider', '$stateProvider', '$urlRouterProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure($logProvider, $stateProvider, $urlRouterProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
      
        routehelperConfigProvider.config.docTitle = 'NG- ' + core.value('config').appTitleSmall + ' : ';
        var resolveAlways = { /* @ngInject */
            ready: function(dataservice) {
                return dataservice.ready();
            }
            // ready: ['dataservice', function (dataservice) {
            //    return dataservice.ready();
            // }]
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }


    core.config(configureLazyElement);
    configureLazyElement.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    function configureLazyElement($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        core.controller = $controllerProvider.register;
        core.directive = $compileProvider.directive;
        core.filter = $filterProvider.register;
        core.factory = $provide.factory;
        core.service = $provide.service;
        core.constant = $provide.constant;
        core.value = $provide.value;
    }


    core.config(configureTranslation);
    configureTranslation.$inject = ['$translateProvider'];
    function configureTranslation($translateProvider) {
        // Register a loader for the static files
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].
        $translateProvider.useStaticFilesLoader({
            prefix: 'l10n/',
            suffix: '.json'
        });
        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('en');
        // Tell the module to store the language in the local storage
        $translateProvider.useLocalStorage();
    }
})();
