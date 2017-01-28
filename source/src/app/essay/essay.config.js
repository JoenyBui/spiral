(function() {
    'use strict';

    angular
        .module('essay')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.essay', {
            url: '/essay/:essayId',
            templateUrl: 'app/essay/essay.tmpl.html',
            // set the controller to load for this page
            controller: 'EssayPageController',
            controllerAs: 'vm',
            // layout-column class added to make footer move to
            // bottom of the page on short pages
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            },
            resolve: {
                loadItem: function ($stateParams, Auth, Essay) {
                    return Auth.$requireSignIn().then(function () {
                        return Essay.getEssay($stateParams.essayId)
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
