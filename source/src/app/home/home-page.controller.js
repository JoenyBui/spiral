(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomePageController', HomePageController);

    /* @ngInject */
    function HomePageController($scope, $mdDialog, $firebaseArray, $firebaseObject) {
        var vm = this;

        vm.ref = firebase.database().ref().child('essays');

        // download the data from a Firebase reference into a (pseudo read-only) array
        // add server changes are applied in realtime
        vm.essayRefs = $firebaseArray(vm.ref);

        // Create a query for the most recent 25 messages on the server.
        var query = vm.essayRefs.orderByChild('timestamp').limitToLast(25);

        // The $firebaseArray service properly handles database queries as well.
        vm.filteredEssarys = $firebaseArray(query);

        $scope.$on('addNewEssay', function (event, $event) {
            var obj = new $firebaseObject(vm.ref);

            obj.name = "";
            obj.text = "";
            obj.timestamp = "";

            obj.$save().then(

            );

        });
    }
})();
