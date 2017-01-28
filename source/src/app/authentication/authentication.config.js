(function() {
    'use strict';

    angular
        .module('app.authentication')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('authentication', {
            abstract: true,
            views: {
                'root': {
                    templateUrl: 'app/authentication/layouts/authentication.tmpl.html'
                }
            },
            data: {
                permissions: {
                    only: ['viewAuthentication']
                }
            }
        })
        .state('authentication.login', {
            url: '/login',
            templateUrl: 'app/authentication/login/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve: {
                requireNoAuth: function($state, Auth){
                    return Auth.$requireSignIn().then(function(auth){
                        $state.go('triangular.home');
                    }, function(error){
                        return;
                    });
                }
            }
        })
        .state('authentication.logout', {
            url: '/logout',
            templateUrl: 'app/authentication/lock/lock.tmpl.html',
            controller: 'LockController',
            controllerAs: 'vm',
            resolve: {
                requireNoAuth: function($state, Auth){
                    return Auth.$signOut().then(function(auth){
                        $state.go('authentication.login');
                    }, function(error){
                        return;
                    });
                }
            }
        })
        .state('authentication.signup', {
            url: '/signup',
            templateUrl: 'app/authentication/signup/signup.tmpl.html',
            controller: 'SignupController',
            controllerAs: 'vm',
            resolve: {
                requireNoAuth: function($state, Auth){
                    return Auth.$requireSignIn().then(function(auth){
                        $state.go('triangular.home');
                    }, function(error){
                        return;
                    });
                }
            }
        })
        .state('authentication.lock', {
            url: '/lock',
            templateUrl: 'app/authentication/lock/lock.tmpl.html',
            controller: 'LockController',
            controllerAs: 'vm'
        })
        .state('authentication.forgot', {
            url: '/forgot',
            templateUrl: 'app/authentication/forgot/forgot.tmpl.html',
            controller: 'ForgotController',
            controllerAs: 'vm'
        })
        .state('triangular.profile', {
            url: '/profile',
            templateUrl: 'app/authentication/profile/profile.tmpl.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            resolve: {
                auth: function($state, Users, Auth){
                    return Auth.$requireSignIn().catch(function(){
                        $state.go('triangular.home');
                    });
                },
                profile: function(Users, Auth){
                    return Auth.$requireSignIn().then(function(auth){
                        return Users.getProfile(auth.uid).$loaded();
                    });
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Authentication',
            icon: 'zmdi zmdi-account',
            type: 'dropdown',
            priority: 4.1,
            permission: 'viewAuthentication',
            children: [{
                name: 'Login',
                state: 'authentication.login',
                type: 'link'
            },{
                name: 'Sign Up',
                state: 'authentication.signup',
                type: 'link'
            },{
                name: 'Forgot Password',
                state: 'authentication.forgot',
                type: 'link'
            },{
                name: 'Lock Page',
                state: 'authentication.lock',
                type: 'link'
            },{
                name: 'Profile',
                state: 'triangular.profile',
                type: 'link'
            }]
        });
    }
})();