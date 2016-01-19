'use strict';

(function() {

class CatchController {

  constructor($http, $scope, Auth) {
    this.$http = $http;

    $scope.getCurrentUser = Auth.getCurrentUser;

   

    $scope.selectedBreeds = [  { 'text':  'Golden Retriever'}  ];
                   
    $scope.allBreeds = function() {
    	return [ 
    	         { 'text':  'Golden Retriever'} ,  
    	         { 'text': 'Labrador'}
    	       ];
    }
    
    
    
    $scope.successMessage = function(response) {
    	
    };
    
    $scope.errorMessage = function(response) {
    	
    };
   
    
    $scope.submitDog = function(picture) {
    	//Convert breeds to an array ( for some reason ng-tags uses a map)
    	$scope.selectedBreedsArray = Array.from( $scope.selectedBreeds,	x => x['text'] ) ;
    	
    	var payload =     		     
    	{
    			   name: $scope.name,
    	           user_id:  $scope.getCurrentUser().name,
    		       picture: [picture.data._id], //Make it look like an array. Just using single element for now. 
    		       breed: $scope.selectedBreedsArray,
    		       comments: $scope.comment	
    	};
    	
    	//Post the dog
    	$http.post('api/dogs', payload ).then($scope.successMessage, $scope.errorMessage)
    };
    
    $scope.submit = function() {
    	console.log($scope.selectedBreeds);
    	console.log($scope.base64ofImg);
    	
    	console.log($scope.getCurrentUser().name);
    	
    	
    	
    	//Post the picture first. This returns the entity picture. 
    	//If successful, pass to submitDog. If not handle error
        $http.post('api/pictures', 
          {
        	user_id: $scope.getCurrentUser().name,
        	picture: $scope.base64ofImg
          } ).then( $scope.submitDog, $scope.errorMessage);
        		  
          
    	
    };
    
    $scope.writeBase64 = function(flowFile) {
    	console.log('writing base64 image to variable');
    	var fileReader = new FileReader();
        fileReader.onload = function (event) {
            $scope.base64ofImg =  event.target.result;     
        };
        fileReader.readAsDataURL(flowFile.file);
    }
                         
    
    
  }
  

  


}

angular.module('doggr3App')
  .controller('CatchController', CatchController);

})();
