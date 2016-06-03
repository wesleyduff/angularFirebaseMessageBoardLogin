// Code goes here
(function(angular){
  'use strict'
  
  
   /*
  --------------
  SERVICE APP
  -------------
  */
  var serviceApp = angular.module('serviceApp', ['ngResource'])
  
  /* ----
  Create Factory Service to get a list of profiles
  - Using $resource
  -- Provided Methods (built in)
  --- 
  { 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };
  */
  .factory('profilesFactoryResponse', ['$resource', function($resource){
      //Most basic GET... 
      //This example does not include CRUD features.
    return $resource('http://api.randomuser.me/?results=5',
        {},
        {});
    }])
    
    
    
    /* Create new functions that handle GET and DELETE using $resource */
    .factory('userFactoryResponse', ['$resource', function($resource){
      var resource = 
        $resource('http://api.randomuser.me',
          {},
          {
            getProfiles : 
            {
              method: 'GET',
            },
            //get method that takes a parameter of "results"
            getFailedProfiles : 
              {
                method: 'GET',
                url : 'http://fake.api.com/result/:results',
                params: 
                {
                  results : '@results'
                }
              },
            //delete example that takes a parameter of the ID of the user to delete
            removeExample : 
            {
              method : 'DELETE',
              url : 'http://fake.api.com/delete/user/:id',
              params: 
              {
                id : '@id'
              }
            }
          }
        );
        
        return {
          getUsers : function(numberOfResults, callback){
            resource.getProfiles({results: numberOfResults}, function(users){
              //change data 
              //buseinss logic goes here.
              callback(users);
            })
          },
          removeUserExample : function(idOfUser, callback){
            resource.removeExample({id: idOfUser}, function(result){
              throw new Error("DEMO ONLY: View Header to see request.");
            })
          },
          getFailedProfiles : function(numberOfResults, callback){
            resource.getFailedProfiles({results : numberOfResults}, function(users){
              throw new Error("DEMO ONLY: View Header to see request.");
            })
          }
        }
        
    }])
  /*
    .factory('userFactoryResponse', ['$http', function($http){
      
    }]);
    */
  
  /*
  --------------
  UI APP
  - inject the 'serviceApp'
  -- this allows us access to all of "serviceApp" properties and methods. This includes "profilesFactoryResponse"
  -------------
  */
  var uiApp = angular.module('uiApp', ['serviceApp'])
  
  /* 
  --------------
  CONTROLLERS for uiApp
  --------------
  - we have access to "serviceApp" as well. 
  -- a factory inside "serviceApp" called "profilesFactoryResponse" is needed to get all of our profile accounts
  --- We use the "get" HTTP request to get a collection of all of our profile accounts
  --
  */
  .controller('MainController', ['$scope', 'profilesFactoryResponse' , 'userFactoryResponse', function($scope, profilesFactoryResponse, userFactoryResponse){
    $scope.Title = "Starting an APP";

    var _users = userFactoryResponse.getFailedProfiles(3, function(users){
      $scope.users = users.results;
    });
    /*
    var removedUser = userFactoryResponse.removeUserExample(1, removedUserFunctionHandler),
        failedGetUsers = userFactoryResponse.getFailedProfiles(10, function namedAnonymous(){
          console.dir(this);
          
        });
    */
    var _profiles = profilesFactoryResponse.get({}, function(accounts){
      console.dir(accounts.results);
      $scope.subTitle = "Reviews";
      $scope.people = accounts.results;
    });
    
    
    function removedUserFunctionHandler(data){
      //handle removedUserData here
      //assign new $scope variables or update old ones for dirty checking
    }
    
  }]);
  
})(angular);