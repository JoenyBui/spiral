(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', AuthFactory)
        .controller('AuthController', AuthController);

    function AuthFactory($firebaseAuth){
        var auth = $firebaseAuth();

        return auth;
    }

    /* @ngInject */
    function AuthController($mdToast, $firebaseAuth, Auth) {
        var authCtrl = this;

        authCtrl.user = {
            email: '',
            password: ''
        };

        authCtrl.error = '';

        authCtrl.login = function (){
            Auth.$signInWithEmailAndPassword(
                authCtrl.user.email,
                authCtrl.user.password
            ).then(function (auth){
                $state.go('triangular.home');
            }, function (error){
                authCtrl.error = error;
            });
        };

        authCtrl.register = function (){
            Auth.$createUserWithEmailAndPassword(
                authCtrl.user.email,
                authCtrl.user.password
            ).then(function (user){
                $state.go('triangular.home');
            }, function (error){
                authCtrl.error = error;
            });
        };


    }
})();
