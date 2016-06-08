(function(angular){
    'use strict'
    
    /* CONTROLLERS */
    function StreamController($scope, $element, $attrs, $firebaseArray){
        var ctrl = this;
        
        ctrl.title = "Stream";
        var ref = new Firebase("boilerplate-angular.firebaseIO.com/Posts");
        ctrl.posts = $firebaseArray(ref);
        
        ctrl.post = function(post, user){
            console.log('POST IN STREAM')
            console.dir(post);
        }
    }
    
    function StreamPostController($scope, $element, $attrs){
        var ctrl = this;
       
        
    }
    
    function MessagesController($scope, $element, $attrs, MessagingService, $cookies){
        
        var ctrl = this,
            _signedInUser_from_cookie = $cookies.getObject('signedInUser')
        ctrl.showMessageForm = _signedInUser_from_cookie !== undefined ? true : false;
        ctrl.errorMessages = []; //list of errors that happened during a post
        ctrl.addPost = function(post){
            MessagingService.postMessage({user: _signedInUser_from_cookie, article: post}, "Posts").then(function(result){
                ctrl.onPost({content: result, user: _signedInUser_from_cookie});
            }, function(err){
                ctrl.errorMessages.push({alertType: 'alert-danger', err: 'err'}); //add an error to the error list to show on the UI
            });
        }
        
        //listen for the custom event to show or hide the message form
        $scope.$on('messageFormVisibilityChanged', function (event, data) {
          ctrl.showMessageForm = true;
        });
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
            onPost : '&'
        },
        templateUrl: '/login/angular.components/messageForm.html',
        controller: MessagesController
    });
    
    
    
    
    
    
})(angular)