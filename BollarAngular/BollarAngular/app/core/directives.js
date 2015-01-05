(function() {
    'use strict';

    angular.module('app.core').directive("ccInclude", function ($http, $templateCache, $compile) {
        return {
            restrict: 'A',
            scope: {
                //twoWayBind: "=ccInclude",
                ccInclude: "&ccInclude"
            },
            link: function (scope, element, attributes) {
                var templateUrl = scope.ccInclude() || scope.ccInclude;
                $http.get(templateUrl, { cache: $templateCache }).success(
                    function (tplContent) {
                        element.replaceWith($compile(tplContent)(scope));
                    }
                );
            }
        };
    });
    //angular.module('app.core').directive('include',
    //    function () {
    //        return {
    //            replace: true,
    //            restrict: 'A',
    //            templateUrl: function (element, attr) {
    //                return attr.pfInclude;
    //            }
    //        };
    //    }
    //);


})();