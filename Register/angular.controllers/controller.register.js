(function(angular){
    'use strict'
    angular.module('RegisterUIModule')
    
    
    .controller('RegisterController', ['$scope', function($scope){
        var user = {};
        $scope.errors = [];
        $scope.registerUser = function(data){
            if(this.password === this.passwordConfirm){
                user.name = this.name;
                user.email = this.email;
                user.password = this.password;
            } else {
                $scope.errors.push({message: "Passwords do not match!", level: "alert-danger"});
            }
        }
    }]);
    
    
})(angular);