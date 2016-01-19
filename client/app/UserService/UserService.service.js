'use strict';

angular.module('doggr3App')
  .service('UserService', function () {
	   return {
	        isLogged: false,
	        username: null
	    }
   
  });
