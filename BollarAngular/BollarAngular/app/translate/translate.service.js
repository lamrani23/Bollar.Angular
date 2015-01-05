(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('translateService', translateService);

    /* @ngInject */
    function translateService($translate,$filter) {
        var vm = this;
        vm.lang = { isopen: false };
        vm.langs = { en: 'English',fr_FR:"French", de_DE: 'German', it_IT: 'Italian' };
  

        var service = {
            lang: vm.lang,
            langs: vm.langs,
            translate: $filter('translate'),
    };

        return service;

    

       


    }
})();
