var signedInUser = {};
(function(angular){
    'use strict'
    
    angular.module('LoginUIModule')
    
    
    
    /* 
  --------------
  CONTROLLERS for uiApp
  --------------
  - we have access to "serviceApp" as well. 
  -- a factory inside "serviceApp" called "profilesFactoryResponse" is needed to get all of our profile accounts
  --- We use the "get" HTTP request to get a collection of all of our profile accounts
  --
  */
  .controller('LoginController', ['$scope', 'Auth', 'fObject', "$firebaseArray", function($scope, Auth, fObject, $firebaseArray){
    
    /* on off */
    $scope.showLogin = true;
    $scope.showStream = true;
    $scope.showProfileCard = false;
    
    
    
    $scope.init = function(){
        var authData = Auth.$getAuth();
        
        if (authData) {
         // $scope.user = authData;
          $scope.showLogin = false;
          $scope.showProfileCard = true;
          
          //bind logged in users 
          var ref = new Firebase("boilerplate-angular.firebaseIO.com/loggedInUsers");
          $scope.loggedInUsers = $firebaseArray(ref);
          
          //If no one logged in then show message
          $scope.loggedInUsers.$loaded(function(){
            if($scope.loggedInUsers.length === 0){
              //TODO ://
             //show message here saying - :( No one is online to talk to.
            }
          });
          
          /*
          //Check to see if the user is loged in. Authenticated
          fObject.loggedInUsers.checkForAuthUser(
            signedInUser = {
              name : authData.facebook.displayName,
              email : authData.facebook.email,
              image : authData.facebook.profileImageURL
            }, function(result){
              if(result.status){
                $scope.loggedInUsers.push(result.user);
                $scope.showLogin = false;
                $scope.showProfileCard = true;
              } else {
                //error occured
                console.dir(result);
              }
            });
          */
          
          //save user as being logged in
          /*
          fObject.LoginMethods.addTo('loggedInUsers', signedInUser).then(function(ref){
              console.dir(res);
              signedInUser.id = ref.key();
          }, function(err){
            console.log('faile');
            console.dir(err);
          });
          */
          
        } else {
          console.log("Logged out");
        }
    }
    
    $scope.logOut = function(){
      fObject.LoginMethods.removeFrom('loggedInUsers', signedInUser.$id).then(function(ref){
        console.dir(ref);
      }, function(err){
        console.dir(err);
      });
      
      Auth.$unauth();
      $scope.showProfileCard = false;
      $scope.showLogin = true;
    };
    
    $scope.anonymous = function(){
        Auth.$authAnonymously().then(function(authData) {
          console.log("Logged in as:", authData.uid);
          $scope.showLogin = false;
          $scope.showProfileCard = true;
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
    }
    
    $scope.loginWith = function(version){
        switch(version){
            case 'facebook':
                Auth.$authWithOAuthPopup("facebook").then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                    $scope.user = authData;
                    $scope.showLogin = false;
                    $scope.showProfileCard = true;
                    
                    signedInUser = {
                      name : authData.facebook.displayName,
                      email : authData.facebook.email,
                      image : authData.facebook.profileImageURL
                    };
          
          
                    fObject.LoginMethods.addTo('loggedInUsers', signedInUser).then(function(result){
                        console.dir(result);
                        signedInUser.$id = result.ref.key();
                    }, function(err){
                      console.log('faile');
                      console.dir(err);
                    });
          
                    
                    
                  }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });
                break;
            case 'google':
                Auth.$authWithOAuthPopup("google").then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                  }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });
                break;
            case 'github':
                Auth.$authWithOAuthPopup("github").then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                  }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });
                break;
        }
    }
    
  }])
    
    
    
    
})(angular);

  