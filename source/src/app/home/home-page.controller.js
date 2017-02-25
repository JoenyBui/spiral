(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomePageController', HomePageController);

    /* @ngInject */
    function HomePageController($scope, $mdDialog, $firebaseArray, $firebaseObject, $state, EssayFactory, auth, Users) {
        var vm = this;

        vm.ref = firebase.database().ref().child('essays');

        var query = vm.ref.orderByChild('owner').equalTo(auth.uid);
        // query = query.orderByChild('timestamp').limitToLast(25);

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
        //
        // function initChat(user) {
        //     // Get a Firebase Database ref
        //     var chatRef = firebase.database().ref("chat");
        //
        //     // Create a Firechat instance
        //     var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
        //
        //     Users.getCurrentProfile().then(function(user) {
        //         user.$loaded()
        //             .then(function (data) {
        //                 // Set the Firechat user
        //                 chat.setUser(user.$id, user.displayName);
        //                 console.log('Data', data);
        //             }).catch(function (error) {
        //                 console.error("Error, ", error);
        //         });
        //     })
        // }

        $scope.$on('addNewEssay', function (event, $event) {
//             var obj = {
//                 name: "Untitled document",
//                 owner: auth.uid,
//                 timestamp: new Date().toLocaleString()
//             };

            var obj = new EssayFactory.Essay(auth.uid);

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
        //
        // initChat(auth);
    }
})();
