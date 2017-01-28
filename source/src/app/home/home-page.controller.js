(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomePageController', HomePageController);

    /* @ngInject */
    function HomePageController($scope, $mdDialog, $firebaseArray, $firebaseObject, $state, auth) {
        var vm = this;

        vm.ref = firebase.database().ref().child('essays');

        var query = vm.ref.orderByChild('timestamp').limitToLast(25);

        vm.essayRefs = $firebaseArray(query);

        // download the data from a Firebase reference into a (pseudo read-only) array
        // add server changes are applied in realtime
        // vm.essayRefs = $firebaseArray(vm.ref);

        vm.essayRefs.$loaded().then(
            function () {
                // Create a query for the most recent 25 messages on the server.
                var query = vm.ref.orderByChild('timestamp').limitToLast(25);

                // The $firebaseArray service properly handles database queries as well.
                vm.filteredEssarys = $firebaseArray(query);
            }
        ).catch(function (error) {

            }
        );


        $scope.$on('addNewEssay', function (event, $event) {
            var obj = {
                name: "Untitled document",
                owner: auth.uid,
                timestamp: new Date().toLocaleString()
            };

            // Add to record.
            vm.essayRefs.$add(
                obj
            ).then(function (ref) {
                var id = ref.key;
                $state.go(
                    'triangular.essay', {
                        'essayId': id
                    }
                )
            });
        });
    }
})();
