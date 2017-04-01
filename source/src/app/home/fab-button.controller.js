(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomeFabController', HomeFabController);

    /* @ngInject */
    function HomeFabController($rootScope) {
        var vm = this;


        vm.fabDirection = 'up';
        vm.fabAnimation = 'md-fling';
        vm.fabStatus = true;
        vm.isOpen = false;

        vm.addNewEssay = function ($event) {
            $rootScope.$broadcast('addNewEssay', $event);
        };

        vm.addNewFriend = function ($event) {
            $rootScope.$broadcast('addNewFriend', $event);
            
        };
    }
})();
