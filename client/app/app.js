'use strict';

angular.module('doggr3App', [
  'doggr3App.auth',
  'doggr3App.admin',
  'doggr3App.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'validation.match',
  'ngTagsInput',
  'flow'
])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider

            .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    })
    .config(['flowFactoryProvider', function (flowFactoryProvider) {
        flowFactoryProvider.defaults = {

            singleFile: true
        };
        flowFactoryProvider.on('catchAll', function (event) {
            console.log('catchAll', arguments);
        });
        // Can be used with different implementations of Flow.js
        // flowFactoryProvider.factory = fustyFlowFactory;;
}]);