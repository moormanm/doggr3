'use strict';

angular.module('doggr3App')
  .config(function($routeProvider) {
    $routeProvider
      .when('/catch', {
        templateUrl: 'app/main/catch.html',
        controller: 'CatchController',
        controllerAs: 'CatchCtrl'
      });
  });
