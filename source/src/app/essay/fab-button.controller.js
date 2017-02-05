/**
 * Created by joeny on 1/31/17.
 */
(function () {
    'use strict';

    angular
        .module('app.essay')
        .controller('EssayFabController', EssayFabController);

    function EssayFabController($rootScope) {
        var vm = this;

        vm.fabDirection = 'up';
        vm.fabAnimation = 'md-fling';
        vm.fabStatus = true;
        vm.isOpen = false;

        this.openShareDialog = function ($event) {
            $rootScope.$broadcast('openShareDialog', $event);
        }
    }
})();
