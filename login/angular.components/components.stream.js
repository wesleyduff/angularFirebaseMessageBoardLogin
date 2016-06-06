(function(angular){
    'use strict'
    
    /* CONTROLLERS */
    function StreamController($scope, $element, $attrs){
        var ctrl = this;
        
        ctrl.title = "Stream";
        ctrl.posts = [
            {
                from: {
                    name: "wes"
                },
                message : "Howdy!!"
            } ,
            {
                from: {
                    name: "bob"
                },
                message : "Howdy 2 U!!"
            }  
        ];
        
        ctrl.addPost = function(post){
            console.log(post);
        }
    }
    
    function StreamPostController($scope, $element, $attrs){
        var ctrl = this;
        
        
    }
    
    function MessagesController($scope, $element, $attrs){
        var ctrl = this;
    }
    
    angular.module('LoginUIModule')
    
    .component('stream', {
        templateUrl: '/login/angular.components/stream.html',
        controller: StreamController
    })
    
    .component('streampost', {
        bindings : {
            post: '<'
        },
        templateUrl: '/login/angular.components/streampost.html',
        controller: StreamPostController
    })
    
    .component('message', {
        bindings : {
            postValue : '@?',
            onPost : '&'
        },
        templateUrl: '/login/angular.components/messageForm.html',
        controller: MessagesController
    });
    
    
    
    
    
    
})(angular)