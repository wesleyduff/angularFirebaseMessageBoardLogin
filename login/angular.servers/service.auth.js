(function(angular){
    'use strict'
    
    angular.module('LoginUIModule')
    
    .factory('Auth', function($firebaseAuth){
        var ref = new Firebase("boilerplate-angular.firebaseIO.com");
        // create an instance of the authentication service
        return $firebaseAuth(ref); 
    })
    
    .factory('fObject', function($firebaseObject, $firebaseArray, $q, MessagingService){
        var ref = new Firebase("boilerplate-angular.firebaseIO.com");
        
        return {
            save : function(name, obj){
                var _obj = $firebaseObject(ref);
                var deffered = $q.defer();
                _obj[name] = obj;
                _obj.$save().then(function(ref){
                    if(ref.key() === _obj.$id){
                        deffered.resolve({status: true});
                    } else {
                        deffered.reject({status: false})
                    }
                });
                return deffered.promise;
            },
            LoginMethods : {
                remove : function(name, obj){
                    var _obj = $firebaseObject(ref);
                    var deffered = $q.defer();
                    _obj[name] = obj;
                    _obj.$remove().then(function(ref){
                        //data has been deleted locally and in the DB
                        deffered.resolve( {status: true, result: ref} );
                    }, function(error){
                        deffered.reject( {status: false, message: error} );
                    });
                    
                    return deffered.promise;
                },
                addTo : function(name, obj){
                    var ref = new Firebase("boilerplate-angular.firebaseIO.com/" + name);
                    var _list = $firebaseArray(ref);
                    var deffered = $q.defer();
                    
                    _list.$add(obj).then(function(ref){
                        var id = ref.key();
                        console.log("added record with id " + id);
                        MessagingService.setMessageFormVisibility(true);
                        deffered.resolve({status: true, ref: ref});
                    }, function(err){
                        deffered.reject({status: false, err: err});
                    })
                    
                    return deffered.promise;
                },
                removeFrom : function(name, obj){
                    var ref = new Firebase("boilerplate-angular.firebaseIO.com/" + name);
                    var _list = $firebaseArray(ref);
                    var deffered = $q.defer();
                    _list.$loaded().then(function(returnedList){
                        var record = _list.$getRecord(obj);
                        _list.$remove(record).then(function(ref){
                            //remove the ability to add messages because the user has logged out
                            MessagingService.setMessageFormVisibility(false);
                            
                            deffered.resolve({status: true, ref: ref});
                        }, function(err){
                            
                           deffered.resject({status: false, err: err});
                        })
                    });
                    return deffered.promise;
                },
                returnLoggedInUsers : function(){
                    var ref = new Firebase("boilerplate-angular.firebaseIO.com/loggedInUsers");
                    var _list = $firebaseArray(ref);
                    _list.$loaded().then(function(returnList){
                        return returnList;
                    }, function(err){
                        return null;
                    });
                },
                returnLoggedInUsersFireBaseArray : function(){
                    var ref = new Firebase("boilerplate-angular.firebaseIO.com/LoggedInUsers");
                    var _list = $firebaseArray(ref);
                    return _list;
                },
                checkForAuthUser : function(signedInUserObj, callback){
                    
                    var ref = new Firebase("boilerplate-angular.firebaseIO.com/loggedInUsers");
                    var _list = $firebaseArray(ref);
                    
                    
                    _list.$loaded().then(function(returnList){
                       //check list of signed in user
                       //if exists then return null
                       //if does not exist then log them into the DB
                       var found = false;
                       for(var i = 0; i < returnList.length; i++){
                           if(returnList[i].name === signedInUserObj.name){
                               found = true;
                               signedInUserObj.$id = returnList[i].$id;
                           }
                       }
                       if(!found){
                            _list.$add(signedInUser).then(function(ref){
                                  callback({status: true, user : ref});
                              }, function(err){
                                console.log('faile');
                                console.dir(err);
                                callback({status: false, error: err});
                              });
                       } else {
                           MessagingService.setMessageFormVisibility(true);
                           callback({status: true, user : signedInUserObj});
                       }
                    }, function(err){
                        return null;
                    });
                }
            },
            MessageMethods : {
               
            }
        }
    })
    
    .factory('beforeUnload', function ($rootScope, $window) {
        // Events are broadcast outside the Scope Lifecycle
        
        $window.onbeforeunload = function (e) {
            var confirmation = {};
            var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
            if (event.defaultPrevented) {
                return confirmation.message;
            }
        };
        
        $window.onunload = function () {
            $rootScope.$broadcast('onUnload');
        };
        return {};
    })
    .run(function (beforeUnload) {
        // Must invoke the service at least once
    });
})(angular)