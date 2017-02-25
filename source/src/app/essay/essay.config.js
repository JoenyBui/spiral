(function() {
    'use strict';

    angular
        .module('app.essay')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.essay', {
            url: '/essay/:essayId',
            views: {
                '': {
                    templateUrl: 'app/essay/essay.tmpl.html',
                    // set the controller to load for this page
                    controller: 'EssayPageController',
                    controllerAs: 'vm'
                },
                'belowContent': {
                    templateUrl: 'app/essay/fab-button.tmpl.html',
                    // set the controller to load for this page
                    controller: 'EssayFabController',
                    controllerAs: 'vm'
                }
            },
            data: {
                layout: {
                    contentClass: 'layout-column',
                    footer: false
                }
            },
            resolve: {
                loadItem: function ($stateParams, Auth, EssayFactory) {
                    return Auth.$requireSignIn().then(function () {
                        return EssayFactory.getEssay($stateParams.essayId)
                    });
                }
            }
        })
        .state('triangular.essay.shared', {
            url: '/essay/shared/:essayId',
            views: {
                '': {
                    templateUrl: 'app/essay/essay.tmpl.html',
                    // set the controller to load for this page
                    controller: 'EssayPageController',
                    controllerAs: 'vm'
                },
                'belowContent': {
                    templateUrl: 'app/essay/fab-button.tmpl.html',
                    // set the controller to load for this page
                    controller: 'EssayFabController',
                    controllerAs: 'vm'
                }
            },
            data: {
                layout: {
                    contentClass: 'layout-column',
                    footer: false
                }
            },
            resolve: {
                loadItem: function ($stateParams, Auth, EssayFactory) {
                    return Auth.$requireSignIn().then(function () {
                        return EssayFactory.getEssay($stateParams.essayId)
                    });
                }
            }
        });

        // triMenuProvider.addMenu({
        //     name: 'Essay Module',
        //     icon: 'fa fa-tree',
        //     type: 'dropdown',
        //     priority: 1.1,
        //     children: [{
        //         name: 'Start Page',
        //         state: 'triangular.essay',
        //         type: 'link'
        //     }]
        // });
    }
})();
