'use strict';

angular.module('doggr3App.auth', [
  'doggr3App.constants',
  'doggr3App.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
