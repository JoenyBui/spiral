(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomePageController', HomePageController);

    /* @ngInject */
    function HomePageController($scope, $mdDialog, $mdToast, $mdSidenav, $mdUtil, $firebaseArray, $firebaseObject, $state, profile,
                                EssayFactory, auth, Users, userEssays, friends) {
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

        // To make the data available in the DOM, assign it to $scope
        $scope.friends = friends;

        vm.essayRefs = userEssays.ownedEssays;
        vm.otherRefs = [];

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

        vm.openDirectMessage = function ($event, id) {
            var uid = id;

            $mdDialog.show({
                controller: 'DirectMessageController',
                controllerAs: 'vm',
                templateUrl: 'app/home/direct-message.tmpl.html',
                locals: {
                    id: id,
                    profile: profile
                },
                targetEvent: $event,
                resolve: {
                    channels: function (ChannelsFactory) {
                        return ChannelsFactory.$loaded();
                    },
                    messages: function(MessagesFactory){
                        return MessagesFactory.forUsers(uid, profile.$id).$loaded();
                    },
                    channelName: function(Users){
                        return Users.all.$loaded().then(function(){
                            return '@'+Users.getDisplayName(uid);
                        });
                    }
                },
                clickOutsideToClose: true,
                escapeToClose: true
            })
        };

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
