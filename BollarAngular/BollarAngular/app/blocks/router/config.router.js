(function() {
    'use strict';


/**
     * Config for the router
     */
    var app = angular.module('blocks.router')
        .run(
            [
                '$rootScope', '$state', '$stateParams',
                function($rootScope, $state, $stateParams) {
                    app.$state = $state;
                    app.$stateParams = $stateParams;
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ]
        )
        .config(
            [
                '$stateProvider', '$urlRouterProvider',
                function($stateProvider, $urlRouterProvider) {

                    app.$stateProvider = $stateProvider;
                    app.$urlRouterProvider = $urlRouterProvider;

                    $urlRouterProvider
                        .otherwise('/app/dashboard');
                    $stateProvider
                        .state('app', {
                            abstract: true,
                            url: '/app',
                            templateUrl: 'app/layout/app.html'
                        })
                        .state('app.dashboard-v1', {
                            templateOnly: true,
                            url: '/dashboard-v1',
                            templateUrl: 'tpl/app_dashboard_v1.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                                    }
                                ]
                            }
                        })
                        .state('app.dashboard-v2', {
                            templateOnly: true,
                            url: '/dashboard-v2',
                            templateUrl: 'tpl/app_dashboard_v2.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                                    }
                                ]
                            }
                        })
                        .state('app.ui', {
                            templateOnly: true,
                            url: '/ui',
                            template: '<div ui-view class="fade-in-up"></div>'
                        })
                        .state('app.ui.buttons', {
                            templateOnly: true,
                            url: '/buttons',
                            templateUrl: 'tpl/ui_buttons.html'
                        })
                        .state('app.ui.icons', {
                            templateOnly: true,
                            url: '/icons',
                            templateUrl: 'tpl/ui_icons.html'
                        })
                        .state('app.ui.grid', {
                            templateOnly: true,
                            url: '/grid',
                            templateUrl: 'tpl/ui_grid.html'
                        })
                        .state('app.ui.widgets', {
                            templateOnly: true,
                            url: '/widgets',
                            templateUrl: 'tpl/ui_widgets.html'
                        })
                        .state('app.ui.bootstrap', {
                            templateOnly: true,
                            url: '/bootstrap',
                            templateUrl: 'tpl/ui_bootstrap.html'
                        })
                        .state('app.ui.sortable', {
                            templateOnly: true,
                            url: '/sortable',
                            templateUrl: 'tpl/ui_sortable.html'
                        })
                        .state('app.ui.portlet', {
                            templateOnly: true,
                            url: '/portlet',
                            templateUrl: 'tpl/ui_portlet.html'
                        })
                        .state('app.ui.timeline', {
                            templateOnly: true,
                            url: '/timeline',
                            templateUrl: 'tpl/ui_timeline.html'
                        })
                        .state('app.ui.tree', {
                            templateOnly: true,
                            url: '/tree',
                            templateUrl: 'tpl/ui_tree.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/tree.js');
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.ui.toaster', {
                            templateOnly: true,
                            url: '/toaster',
                            templateUrl: 'tpl/ui_toaster.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('toaster').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/toaster.js');
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.ui.jvectormap', {
                            templateOnly: true,
                            url: '/jvectormap',
                            templateUrl: 'tpl/ui_jvectormap.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('js/controllers/vectormap.js');
                                    }
                                ]
                            }
                        })
                        .state('app.ui.googlemap', {
                            templateOnly: true,
                            url: '/googlemap',
                            templateUrl: 'tpl/ui_googlemap.html',
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load([
                                            'js/app/map/load-google-maps.js',
                                            'js/app/map/ui-map.js',
                                            'js/app/map/map.js'
                                        ]).then(
                                            function() {
                                                return loadGoogleMaps();
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.chart', {
                            templateOnly: true,
                            url: '/chart',
                            templateUrl: 'tpl/ui_chart.html',
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load('js/controllers/chart.js');
                                    }
                                ]
                            }
                        })
                        // table
                        .state('app.table', {
                            templateOnly: true,
                            url: '/table',
                            template: '<div ui-view></div>'
                        })
                        .state('app.table.static', {
                            templateOnly: true,
                            url: '/static',
                            templateUrl: 'tpl/table_static.html'
                        })
                        .state('app.table.datatable', {
                            templateOnly: true,
                            url: '/datatable',
                            templateUrl: 'tpl/table_datatable.html'
                        })
                        .state('app.table.footable', {
                            templateOnly: true,
                            url: '/footable',
                            templateUrl: 'tpl/table_footable.html'
                        })
                        .state('app.table.grid', {
                            templateOnly: true,
                            url: '/grid',
                            templateUrl: 'tpl/table_grid.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('ngGrid').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/grid.js');
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        // form
                        .state('app.form', {
                            templateOnly: true,
                            url: '/form',
                            template: '<div ui-view class="fade-in"></div>',
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load('js/controllers/form.js');
                                    }
                                ]
                            }
                        })
                        .state('app.form.elements', {
                            templateOnly: true,
                            url: '/elements',
                            templateUrl: 'tpl/form_elements.html'
                        })
                        .state('app.form.validation', {
                            templateOnly: true,
                            url: '/validation',
                            templateUrl: 'tpl/form_validation.html'
                        })
                        .state('app.form.wizard', {
                            templateOnly: true,
                            url: '/wizard',
                            templateUrl: 'tpl/form_wizard.html'
                        })
                        .state('app.form.fileupload', {
                            templateOnly: true,
                            url: '/fileupload',
                            templateUrl: 'tpl/form_fileupload.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('angularFileUpload').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/file-upload.js');
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.form.imagecrop', {
                            templateOnly: true,
                            url: '/imagecrop',
                            templateUrl: 'tpl/form_imagecrop.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('ngImgCrop').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/imgcrop.js');
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.form.select', {
                            templateOnly: true,
                            url: '/select',
                            templateUrl: 'tpl/form_select.html',
                            controller: 'SelectCtrl',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('ui.select').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/select.js');
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.form.slider', {
                            templateOnly: true,
                            url: '/slider',
                            templateUrl: 'tpl/form_slider.html',
                            controller: 'SliderCtrl',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('vr.directives.slider').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/slider.js');
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.form.editor', {
                            templateOnly: true,
                            url: '/editor',
                            templateUrl: 'tpl/form_editor.html',
                            controller: 'EditorCtrl',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('textAngular').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/editor.js');
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        // pages
                        .state('app.page', {
                            templateOnly: true,
                            url: '/page',
                            template: '<div ui-view class="fade-in-down"></div>'
                        })
                        .state('app.page.profile', {
                            templateOnly: true,
                            url: '/profile',
                            templateUrl: 'tpl/page_profile.html'
                        })
                        .state('app.page.post', {
                            templateOnly: true,
                            url: '/post',
                            templateUrl: 'tpl/page_post.html'
                        })
                        .state('app.page.search', {
                            templateOnly: true,
                            url: '/search',
                            templateUrl: 'tpl/page_search.html'
                        })
                        .state('app.page.invoice', {
                            templateOnly: true,
                            url: '/invoice',
                            templateUrl: 'tpl/page_invoice.html'
                        })
                        .state('app.page.price', {
                            templateOnly: true,
                            url: '/price',
                            templateUrl: 'tpl/page_price.html'
                        })
                        .state('app.docs', {
                            templateOnly: true,
                            url: '/docs',
                            templateUrl: 'tpl/docs.html'
                        })
                        // others
                        .state('lockme', {
                            templateOnly: true,
                            url: '/lockme',
                            templateUrl: 'tpl/page_lockme.html'
                        })
                        .state('access', {
                            templateOnly: true,
                            url: '/access',
                            template: '<div ui-view class="fade-in-right-big smooth"></div>'
                        })
                        .state('access.signin', {
                            templateOnly: true,
                            url: '/signin',
                            templateUrl: 'tpl/page_signin.html',
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load(['js/controllers/signin.js']);
                                    }
                                ]
                            }
                        })
                        .state('access.signup', {
                            templateOnly: true,
                            url: '/signup',
                            templateUrl: 'tpl/page_signup.html',
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load(['js/controllers/signup.js']);
                                    }
                                ]
                            }
                        })
                        .state('access.forgotpwd', {
                            templateOnly: true,
                            url: '/forgotpwd',
                            templateUrl: 'tpl/page_forgotpwd.html'
                        })
                        .state('access.404', {
                            templateOnly: true,
                            url: '/404',
                            templateUrl: 'tpl/page_404.html'
                        })

                        // fullCalendar
                        .state('app.calendar', {
                            templateOnly: true,
                            url: '/calendar',
                            templateUrl: 'tpl/app_calendar.html',
                            // use resolve to load other dependences
                            resolve: {
                                deps: [
                                    '$ocLazyLoad', 'uiLoad',
                                    function($ocLazyLoad, uiLoad) {
                                        return uiLoad.load(
                                            [
                                                'vendor/jquery/fullcalendar/fullcalendar.css',
                                                'vendor/jquery/fullcalendar/theme.css',
                                                'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                                'vendor/libs/moment.min.js',
                                                'vendor/jquery/fullcalendar/fullcalendar.min.js',
                                                'js/app/calendar/calendar.js'
                                            ]
                                        ).then(
                                            function() {
                                                return $ocLazyLoad.load('ui.calendar');
                                            }
                                        );
                                    }
                                ]
                            }
                        })

                        // mail
                        .state('app.mail', {
                            abstract: true,
                            templateOnly: true,
                            url: '/mail',
                            templateUrl: 'tpl/mail.html',
                            // use resolve to load other dependences
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load([
                                            'js/app/mail/mail.js',
                                            'js/app/mail/mail-service.js',
                                            'vendor/libs/moment.min.js'
                                        ]);
                                    }
                                ]
                            }
                        })
                        .state('app.mail.list', {
                            templateOnly: true,
                            url: '/inbox/{fold}',
                            templateUrl: 'tpl/mail.list.html'
                        })
                        .state('app.mail.detail', {
                            templateOnly: true,
                            url: '/{mailId:[0-9]{1,4}}',
                            templateUrl: 'tpl/mail.detail.html'
                        })
                        .state('app.mail.compose', {
                            templateOnly: true,
                            url: '/compose',
                            templateUrl: 'tpl/mail.new.html'
                        })
                        .state('layout', {
                            abstract: true,
                            templateOnly: true,
                            url: '/layout',
                            templateUrl: 'tpl/layout.html'
                        })
                        .state('layout.fullwidth', {
                            templateOnly: true,
                            url: '/fullwidth',
                            views: {
                                '': {
                                    templateUrl: 'tpl/layout_fullwidth.html'
                                },
                                'footer': {
                                    templateUrl: 'tpl/layout_footer_fullwidth.html'
                                }
                            },
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load(['js/controllers/vectormap.js']);
                                    }
                                ]
                            }
                        })
                        .state('layout.mobile', {
                            templateOnly: true,
                            url: '/mobile',
                            views: {
                                '': {
                                    templateUrl: 'tpl/layout_mobile.html'
                                },
                                'footer': {
                                    templateUrl: 'tpl/layout_footer_mobile.html'
                                }
                            }
                        })
                        .state('layout.app', {
                            templateOnly: true,
                            url: '/app',
                            views: {
                                '': {
                                    templateUrl: 'tpl/layout_app.html'
                                },
                                'footer': {
                                    templateUrl: 'tpl/layout_footer_fullwidth.html'
                                }
                            },
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load(['js/controllers/tab.js']);
                                    }
                                ]
                            }
                        })
                        .state('apps', {
                            abstract: true,
                            templateOnly: true,
                            url: '/apps',
                            templateUrl: 'tpl/layout.html'
                        })
                        .state('apps.note', {
                            templateOnly: true,
                            url: '/note',
                            templateUrl: 'tpl/apps_note.html',
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load([
                                            'js/app/note/note.js',
                                            'vendor/libs/moment.min.js'
                                        ]);
                                    }
                                ]
                            }
                        })
                        .state('apps.contact', {
                            templateOnly: true,
                            url: '/contact',
                            templateUrl: 'tpl/apps_contact.html',
                            resolve: {
                                deps: [
                                    'uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load(['js/app/contact/contact.js']);
                                    }
                                ]
                            }
                        })
                        .state('app.weather', {
                            templateOnly: true,
                            url: '/weather',
                            templateUrl: 'tpl/apps_weather.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load(
                                            {
                                                name: 'angular-skycons',
                                                files: [
                                                    'js/app/weather/skycons.js',
                                                    'vendor/libs/moment.min.js',
                                                    'js/app/weather/angular-skycons.js',
                                                    'js/app/weather/ctrl.js'
                                                ]
                                            }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('music', {
                            templateOnly: true,
                            url: '/music',
                            templateUrl: 'tpl/music.html',
                            controller: 'MusicCtrl',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load([
                                            'com.2fdevs.videogular',
                                            'com.2fdevs.videogular.plugins.controls',
                                            'com.2fdevs.videogular.plugins.overlayplay',
                                            'com.2fdevs.videogular.plugins.poster',
                                            'com.2fdevs.videogular.plugins.buffering',
                                            'js/app/music/ctrl.js',
                                            'js/app/music/theme.css'
                                        ]);
                                    }
                                ]
                            }
                        })
                        .state('music.home', {
                            templateOnly: true,
                            url: '/home',
                            templateUrl: 'tpl/music.home.html'
                        })
                        .state('music.genres', {
                            templateOnly: true,
                            url: '/genres',
                            templateUrl: 'tpl/music.genres.html'
                        })
                        .state('music.detail', {
                            templateOnly: true,
                            url: '/detail',
                            templateUrl: 'tpl/music.detail.html'
                        })
                        .state('music.mtv', {
                            templateOnly: true,
                            url: '/mtv',
                            templateUrl: 'tpl/music.mtv.html'
                        })
                        .state('music.mtvdetail', {
                            templateOnly: true,
                            url: '/mtvdetail',
                            templateUrl: 'tpl/music.mtv.detail.html'
                        })
                        .state('music.playlist', {
                            templateOnly: true,
                            url: '/playlist/{fold}',
                            templateUrl: 'tpl/music.playlist.html'
                        });
                }
            ]
        );
})();