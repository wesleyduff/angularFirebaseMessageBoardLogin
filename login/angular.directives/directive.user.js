(function(angular){
    'use strict'
    
    angular.module('LoginUIModule')
    
    
    .directive('user', function(){
        return {
            scope : { user : '=userData'},
            templateUrl : '/login/angular.directives/user.html'
        };
    })
    
    .directive('logedInUsers', function(){
        return {
            templateUrl : '/login/angular.directives/logedInUsers.html'
        }
    })
    
    .directive('login', function(){
        return {
            templateUrl : '/login/angular.directives/login.html'
        }
    });
    
    
})(angular);