(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter, $firebaseAuth, triSettings, UserService) {
        var vm = this;

        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            name: '',
            email: '',
            password: '',
            confirm: ''
        };

        ////////////////

        function signupClick() {
            var Auth = $firebaseAuth();

            Auth.$createUserWithEmailAndPassword(vm.user.email, vm.user.password)
            .then(function (auth){

                UserService.createProfile(auth.uid);
                UserService.createUser(auth.uid);
                UserService.saveEmailKey(auth.uid, auth.email);

                $mdToast.show(
                    $mdToast.simple()
                        .content($filter('triTranslate')('Confirmation sent'))
                        .position('bottom right')
                        .action($filter('triTranslate')('Login'))
                        .highlightAction(true)
                        .hideDelay(0)
                ).then(function() {
                    $state.go('authentication.login');
                });

                // $state.go('home');
            }, function (error){
                $mdToast.show(
                    $mdToast.simple()
                        .content(error)
                        .position('bottom right')
                        .action($filter('triTranslate')('Login'))
                        .highlightAction(true)
                        .hideDelay(0)
                ).then(function() {
                    $state.go('authentication.login');
                });

            });
        }
    }
})();
