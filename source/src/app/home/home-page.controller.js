(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomePageController', HomePageController);

    /* @ngInject */
    function HomePageController() {
        var vm = this;
        
        vm.testData = ['triangular', 'is', 'great'];
    }
})();
