(function() {
    'use strict';

    angular
        .module('home')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.home', {
            url: '/home',
            templateUrl: 'app/home/home-page.tmpl.html',
            // set the controller to load for this page
            controller: 'HomePageController',
            controllerAs: 'vm',
            // layout-column class added to make footer move to
            // bottom of the page on short pages
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            },
            views: {
                '': {
                    templateUrl: 'app/home/home-page.tmpl.html',
                    controller: 'HomePageController',
                    controllerAs: 'vm'
                },
                'belowContent': {
                    templateUrl: 'app/home/fab-button.tmpl.html',
                    controller: 'HomeFabController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                auth: function($state, Users, Auth){
                    return Auth.$requireSignIn().catch(function(){
                        // $state.go('triangular.home');
                    });
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Home Module',
            icon: 'fa fa-tree',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Start Page',
                state: 'triangular.home',
                type: 'link'
            }]
        });
    }
})();
