(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomePageController', HomePageController);

    /* @ngInject */
    function HomePageController($scope, $mdDialog, $mdToast, $firebaseArray, $firebaseObject, $state, EssayFactory,
                                auth, Users, userEssays, friends) {
        var vm = this;

        vm.users = Users;

        vm.friendsList = [];

        // vm.ref = firebase.database().ref().child('essay');

        // var query = vm.ref.orderByChild('owner').equalTo(auth.uid);
        // query = query.orderByChild('timestamp').limitToLast(25);
        var ref = firebase.database().ref();
        var profileRef = ref.child('profile');
        var usersRef = ref.child('user');
        var userRef = usersRef.child(auth.uid);
        vm.friendsRef = friends.$ref();

        vm.friendsRef.on('child_added', function (data) {
            vm.friendsList.push(data.val());
        });

        // Check for user presence.
        var amOnline = ref.child('.info/connected');
        var userPresenceRef = userRef.child('presence');

        amOnline.on('value', function(snapshot) {
            if (snapshot.val()) {
                userPresenceRef.onDisconnect().remove();
                userPresenceRef.set(true);
            }
        });

//         var obj = $firebaseObject(friendsRef);
//         // to take an action after the data loads, use the $loaded() promise
//         obj.$loaded().then(function() {
//             console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

//             // To iterate the key/value pairs of the object, use angular.forEach()
//             angular.forEach(obj, function(value, key) {
//                 console.log(key, value);
//             });
//         });

        // To make the data available in the DOM, assign it to $scope
        $scope.friends = friends;

        // For three-way data bindings, bind it to the scope instead
//         obj.$bindTo($scope, "friends");

        // list.$watch(function (event) {
        //     console.log(event);
        // });

        // $scope.friends = {};

        // var handles = [];
        // friendsRef.on('child_added', function (snapshot) {
        //     var uid = snapshot.val();
        //
        //     // vm.friends[uid] = {
        //     var friendObj = {
        //         name: '',
        //         image: '',
        //         status: ''
        //     };
        //
        //     // Check if user is log on.
        //     profileRef.child(uid).on('value', function (profileSnapshot) {
        //     // profileRef.child(uid).once('value', function (profileSnapshot) {
        //         var obj = profileSnapshot.val();
        //
        //         // vm.friends[uid].name = obj.displayName;
        //         // vm.friends[uid].image = obj.avatar;
        //
        //         friendObj.name = obj.displayName;
        //         friendObj.image = obj.avatar;
        //
        //
        //         usersRef.child(uid).child('presence').on('value', function (userSnapshot) {
        //             if (userSnapshot.val() == true) {
        //                 // vm.friends[uid].status = true;
        //                 friendObj.status = true;
        //             } else {
        //                 friendObj.status = false;
        //                 // vm.friends[uid].status = false;
        //             }
        //
        //             $scope.friends[uid] = friendObj;
        //
        //         });
        //     });
        //
        //
        //     // handles.push();
        // });

        vm.essayRefs = userEssays.ownedEssays;
        vm.otherRefs = [];

        // List the names of all Mary's groups
        // var ref = new Firebase("https://docs-examples.firebaseio.com/web/org");

        // fetch a list of shared essays.
        ref.child('sharedEssays').on('child_added', function (snapshot) {
            // for each group, fetch the essay
            var key = snapshot.val();
            firebase.database().ref().child('essay').child(key).once('value', function (snapshot) {
                    var obj = snapshot.val();
                    obj.key = snapshot.key;

                    vm.otherRefs.push(obj);
                }
            )
        });

        // fetch a list of Mary's groups
        // ref.child("users/mchen/groups").on('child_added', function(snapshot) {
        //     // for each group, fetch the name and print it
        //     list = snapshot.key();
        //     ref.child("groups/" + groupKey + "/name").once('value', function(snapshot) {
        //         System.out.println("Mary is a member of this group: " + snapshot.val());
        //     });
        // });


        // vm.otherRefs = userEssays.sharedEssays;

        // vm.essayRefs = $firebaseArray(query);

        // download the data from a Firebase reference into a (pseudo read-only) array
        // add server changes are applied in realtime
        // vm.essayRefs = $firebaseArray(vm.ref);

        // vm.essayRefs.$loaded().then(
        //     function () {
        //         // Create a query for the most recent 25 messages on the server.
        //         var query = vm.ref.orderByChild('timestamp').limitToLast(25);
        //
        //         // The $firebaseArray service properly handles database queries as well.
        //         vm.filteredEssarys = $firebaseArray(query);
        //     }
        // ).catch(function (error) {
        //
        //     }
//         );
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

        $scope.$on('addNewFriend', function (event, $event) {
            $mdDialog.show({
                controller: 'FriendAddDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/home/friend.add.dialog.tmpl.html',
                locals: {
                    model: vm.loadItem
                },
                targetEvent: $event
            }).then(function (sharedUsers) {
                // pop a toast
                // $mdToast.show(
                //   $mdToast.simple()
                //       .textContent('WhAM Input submitted to run!')
                //     .position('bottom right')
                //     .hideDelay(2000)
                // )
            })
        });

        $scope.$on('addToFriendslist', function ($event, id) {
            //TODO: Check if the user already exists.
            var id = id;

            var obj = $firebaseObject(userRef);

            obj.$loaded().then(function () {
                if (obj.friends == undefined) {
                    obj.friends = [id];
                } else {
                    obj.friends.push(id);
                }

                obj.$save().then(function() {
                    $mdToast.show(
                        $mdToast.simple(id + ' id just added.')
                            .content()
                            .position('bottom right')
                            .highlightAction(true)
                            .hideDelay(0)
                    );
                });
            });

        });
    }
})();
