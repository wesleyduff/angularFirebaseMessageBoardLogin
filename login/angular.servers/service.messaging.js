(function(angular){
    'use strict'
    
    angular.module('LoginUIModule')
    
    .factory('MessagingService', function( $firebaseObject, $firebaseArray, $q, $rootScope){
        return {
            postMessage : function(post, name){
                var ref = new Firebase("boilerplate-angular.firebaseIO.com/" + name);
                var _list = $firebaseArray(ref);
                var deffered = $q.defer();
                
                _list.$add(post).then(function(ref){
                    var id = ref.key();
                    console.log("POST : added record with id " + id);
                    deffered.resolve({status: true, ref: ref});
                }, function(err){
                    deffered.reject({status: false, err: err});
                })
                
                return deffered.promise;
            },
            getMessages : function(){
                var ref = new Firebase("boilerplate-angular.firebaseIO.com/Messages");
                var _list = $firebaseArray(ref);
                return _list;
            },
            setMessageFormVisibility : function(val){
                this.messageFormVisibility = val;
                $rootScope.$broadcast('messageFormVisibilityChanged');
            },
            getMessageFormVisibility : function(){
                return this.messageFormVisibility;
            },
            messageFormVisibility : true
        }
    });
    
})(angular);