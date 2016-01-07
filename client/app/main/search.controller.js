'use strict';

(function() {

class SearchController {

  constructor($http, $scope) {
    this.$http = $http;
    this.awesomeThings = [];

    $scope.breeds = [ {text: 'Golden Retriever'},
                  {text: 'Labrador'}
                ];
    
    
    $scope.dogs = [ 
                    { name: 'Lucy'  },
                    { name: 'Rover'  },
                    { name: 'Jinx'  },
                    ] 

  }

}

angular.module('doggr3App')
  .controller('SearchController', SearchController);

})();
