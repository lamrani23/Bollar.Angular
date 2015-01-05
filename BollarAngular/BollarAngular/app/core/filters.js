(function() {
    'use strict';

    angular.module("app.core").filter('partition', function ($filter,$cacheFactory) {
        var arrayCache = $cacheFactory('partition');
        return function (arr, length) {
            var size = JSON.parse(length);
            if (!arr) { return; }
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            var cachedParts;
            var arrString = JSON.stringify(arr);
            cachedParts = arrayCache.get(arrString + size);
            if (JSON.stringify(cachedParts) === JSON.stringify(newArr)) {
                return cachedParts;
            }
            arrayCache.put(arrString + size, newArr);
            return newArr;
        };;
    });

    angular.module("app.core").filter('picker', function ($filter) {
        return function (value, filterName) {
            return $filter(filterName)(value);
        };
    });

    angular.module("app.core").filter('timepassed', timepassed);
    /* @ngInject */
    function timepassed ($filter,moment) {
        return function (value, filterName) {
            return value;
        };
    }
})();