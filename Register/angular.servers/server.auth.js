(function(angular){
    'use strict'
    
    angular.module('RegisterUIModule')
    
    .factory('Auth', function($firebaseAuth){
        var ref = new Firebase("https://angulardemogm.firebaseio.com/");
        // create an instance of the authentication service
        return $firebaseAuth(ref); 
    });
    
})(angular)