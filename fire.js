(function(angular){
    'use strict'
    
    /* -------------------------------------------------
    Create Service MODEL
    - Contains
        - Access to our Fire Base Service
    */
    var fireServiceModel = angular.module('fireModule', ['ngResource']);
    
    /*
    Create SERVICE
    - Connects to Firebase
    - allows CRUD operations
    - allows ADMIN changes
    */
    
    /*------------------------------------------------ */
    
    /* -------------------------------------------------
    Create Directives MODEL
    - Contains
        - Access to our Fire Base Directives
    */
    var fireDirectiveModel = angular.module('fireDirectiveModule', []);
     /*
    Create DIRECTIVE
    - TBD
    */
    
     /* -------------------------------------------------
    Create UI MODEL
    - Contains
        - Access to our view
        - Access to our Service Model
        - Access to our Fire Base Directives
    */
    var fireUIModel = angular.module('fireUIModule', ['fireModule', 'fireDirectiveModule']);
         // Instantiates the Firebase Auth instance.
      
    
    /* Create ROOT CONTROLLER
      - Main entry point into our app
    */
    fireUIModel.controller('FireController', ['$scope', function($scope){
       
      
        $scope.title = "Fire Base App";
        $scope.subtitle = "a working example of the javascript database 'FireBase'";
        $scope.activeuser = globe.activeuser; //our global variable with data.
    }]);
    
    /* ------------------------------------------------*/
})(angular);