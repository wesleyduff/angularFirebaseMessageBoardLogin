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
    })
    
    .directive('stream', function(){
       return {
           templateUrl : '/login/angular.directives/stream.html'
       } 
    })
    
    .directive('message', function(){
        return {
            templateUrl : '/login/angular.directives/messageForm.html'
        }
    })
    
    .directive('streampost', function(){
        return {
            restrict : 'A',
            templateUrl : '/login/angular.directives/streampost.html'
        }
    });
    
    
})(angular);