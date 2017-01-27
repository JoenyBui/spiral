(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomeFabController', HomeFabController);

    /* @ngInject */
    function HomeFabController($rootScope) {
        var vm = this;

        this.addNewEssay = function ($event) {
            $rootScope.$broadcast('addNewEssay', $event);
        }
    }
})();
