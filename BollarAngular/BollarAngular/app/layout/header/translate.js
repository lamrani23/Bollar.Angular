(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('translateController', translateController);

   // translateController.$inject = ['$q', 'logger'];

/* @ngInject */
    function translateController($rootScope, $translate, $q, logger, translateService) {

        /*jshint validthis: true */
        var vm = this;
        // angular translate
        vm.lang = translateService.lang;
        vm.langs = translateService.langs;
        vm.selectLang = vm.langs[$translate.proposedLanguage()] || "English";
        vm.setLang = function (langKey, $event) {
            // set the current lang
            vm.selectLang = vm.langs[langKey];
            // You can change the language during runtime
            $translate.use(langKey);
            vm.lang.isopen = !vm.lang.isopen;
            translateService.selectLang = vm.selectLang;
      
            return vm.selectLang;
        };


        activate();

        function activate() {
            var promises = [];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                logger.info('Activated translateController View');
            });
        }


    }

})();
