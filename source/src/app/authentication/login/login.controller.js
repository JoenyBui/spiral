(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, $firebaseAuth, triSettings) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#',
            login: function() {
                var auth = $firebaseAuth();

                // login with Facebook
                auth.$signInWithPopup("twitter").then(function(firebaseUser) {
                    $state.go('triangular.home');
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });

            }
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#',
            login: function() {
                var auth = $firebaseAuth();

                // login with Facebook
                auth.$signInWithPopup("facebook").then(function(firebaseUser) {
                    $state.go('triangular.home');
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });

            }
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#',
            login: function() {
                var auth = $firebaseAuth();

                // login with Facebook
                auth.$signInWithPopup("google").then(function(firebaseUser) {
                    $state.go('triangular.home');
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });

            }
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#',
            login: function() {
                var auth = $firebaseAuth();

                // login with Facebook
                auth.$signInWithPopup("linkedin").then(function(firebaseUser) {
                    $state.go('triangular.home');
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });
            }
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        ////////////////

        function loginClick() {
            var Auth = $firebaseAuth();

            Auth.$signInWithEmailAndPassword(
                vm.user.email,
                vm.user.password
            ).then(function (auth){
                $state.go('triangular.home');
            }, function (error){
                authCtrl.error = error;
            });


        }
    }
})();
