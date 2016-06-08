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
  .controller('LoginController', ['$scope', 'Auth', 'fObject', "$firebaseArray", "beforeUnload", "$cookies", function($scope, Auth, fObject, $firebaseArray, beforeUnload, $cookies){
    
    /* on off */
    $scope.showLogin = true;
    $scope.showStream = true;
    $scope.showProfileCard = false;
    $scope.showLogout = false;
    
    
    /*
    HANDLE page leave functionality.
    - Log out the user if they leave the page with confirmation
    */
    $scope.$on('onBeforeUnload', function (e, confirmation) {
      e.preventDefault();
      $scope.logOut(false);
    });
    
    $scope.$on('onUnload', function (e) {
        console.log('leaving page'); // Use 'Preserve Log' option in Console
    });
    
    $scope.init = function(){
        var authData = Auth.$getAuth();
        
        var ref = new Firebase("boilerplate-angular.firebaseIO.com/loggedInUsers");
        $scope.loggedInUsers = $firebaseArray(ref);
          $scope.loggedInUsers.$loaded(function(){
            if($scope.loggedInUsers.length > 0){
              $scope.showProfileCard = true;
              $scope.LoggedInUsersTitle = "Logged in Users";
            } else {
              $scope.LoggedInUsersTitle = "No one is currenlty logged in.";
            }
          });
        
        
        /* If we have a logged in User */
        if (authData) {
         // $scope.user = authData;
          $scope.showLogout = true;
          $scope.showLogin = false;
          fObject.LoginMethods.checkForAuthUser(
            signedInUser = {
              name : authData.facebook.displayName,
              email : authData.facebook.email !== undefined ? authData.facebook.email : 'Not provided',
              image : authData.facebook.profileImageURL
            }, function(result){
              if(result.status){
                signedInUser = result.user;
                $cookies.put('signedInUser', JSON.stringify(signedInUser));
              } else {
                //error occured
                console.dir(result);
              }
            });
          
          
          
        } else {
          //get a list of loged in users and display
          //check cookies and see if they have a cookie set
          var signedInUser_from_cookie = $cookies.getObject('signedInUser');
          if(signedInUser_from_cookie !== null && signedInUser_from_cookie !== undefined){
            signedInUser = signedInUser_from_cookie;
            $scope.loggedInUsers.$add({name: signedInUser.name, email: signedInUser.email, image : signedInUser.image}).then(function(result){
              signedInUser.$id = result.key();
              $cookies.put('signedInUser', JSON.stringify(signedInUser));
              $scope.showLogin = false;
              $scope.showLogout = true;
            });
          }
        }
    }
    
    $scope.logOut = function(withCookie = true){
      if(signedInUser !== undefined || signedInUser !== null){
        fObject.LoginMethods.removeFrom('loggedInUsers', signedInUser.$id).then(function(ref){
          
            Auth.$unauth();
            $scope.showLogin = true;
        
            if(withCookie){
              $cookies.remove('signedInUser');
            }
            
        }, function(err){
          console.dir(err);
        });
      }
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
                    $scope.showLogout = true;
                    
                    signedInUser = {
                      name : authData.facebook.displayName,
                      email : authData.facebook.email !== undefined ? authData.facebook.email : 'Not provided',
                      image : authData.facebook.profileImageURL
                    };
          
                    fObject.LoginMethods.addTo('loggedInUsers', signedInUser).then(function(result){
                      
                        signedInUser.$id = result.ref.key();
                        $cookies.put('signedInUser', JSON.stringify(signedInUser));
                        
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

  