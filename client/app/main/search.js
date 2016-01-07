'use strict';

angular.module('doggr3App')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/search.html',
        controller: 'SearchController',
        controllerAs: 'main'
      });
  });




