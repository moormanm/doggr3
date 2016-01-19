'use strict';

(function() {

class SearchController {

  constructor($http, $scope) {
    this.$http = $http;
    this.awesomeThings = [];

    $scope.breeds = [ {text: 'Golden Retriever'},
                  {text: 'Labrador'}
                ];
    
    
    
    var onDogsLoaded = function(response) {
    	console.log(response);
    	$scope.dogs = response.data;
    };
    
    var onDogsLoadError = function(response) {
    	console.log(response);
    };
    
    
    $http.get('api/dogs').then(onDogsLoaded);
    
  }

}

angular.module('doggr3App')
  .controller('SearchController', SearchController);

})();
