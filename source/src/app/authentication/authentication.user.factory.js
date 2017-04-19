(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('Users', UsersFactory);

    function UsersFactory($q, $firebaseArray, $firebaseObject, Auth) {
        var usersRef = firebase.database().ref('user');
        var profileRef = firebase.database().ref('profile');
        var emailMapRef = firebase.database().ref('emailMap');
        var connectedRef = firebase.database().ref('.info/connected');

        var users = $firebaseArray(usersRef);
        var profiles = $firebaseArray(profileRef);
        var currentUserUid = null;

        Auth.$requireSignIn().then(function (auth) {
            currentUserUid = auth.uid
        });

        var Users = {
            usersRef: usersRef,
            profileRef: profileRef,
            emailMapRef: emailMapRef,
            shareEssayToUser: function () {

            },
            isCurrentUser: function (uid) {
                return currentUserUid == uid;
            },
            getFriendsListRef: function (uid) {
                return firebase.database().ref().child('user').child(uid).child('friends');
            },
            getFriendsList: function (uid) {
                return $firebaseArray(this.getFriendsListRef(uid));
            },
            getProfile: function(uid){
                return $firebaseObject(profileRef.child(uid));
            },
            getCurrentProfile: function() {
                return Auth.$requireSignIn().then(function (auth) {
                    return vm.getProfile(auth.uid);
                });
            },
            getCurrentStatus: function (uid) {
                return users.$getRecord(uid).presence;
            },
            getDisplayName: function(uid){
                return profiles.$getRecord(uid).displayName;
            },
            getGravatar: function(uid){
                // Check for gravtar. If not then default to something.
                return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
            },
            findUserByEmail: function (email) {
                // return usersRef.orderByChild('emailAddress').equalTo(emailAddress);
                var list = $firebaseArray(emailMapRef);
                var deferred = $q.defer();

                list.$loaded().then(function(data) {
                    var emailKey = encodeURIComponent(email).replace(/\./g, '%2E');

                    var obj = list.$getRecord(emailKey);

                    if (obj == null) {
                        deferred.reject(email);
                    } else {
                        deferred.resolve(obj);
                    }
                }).catch(function(error) {
                    deferred.reject(email);
                });

                return deferred.promise;
            },
            findUserByName: function (name) {
                return profileRef.orderByChild('name')
                    .startAt(name)
                    .endAt(name)
                    .once('value', function(snap){
                        var foundUser = snap.val();

                        console.log(foundUser);
                    });
            },
            setOnline: function(uid){
                var connected = $firebaseObject(connectedRef);
                var online = $firebaseArray(usersRef.child(uid+'/online'));

                connected.$watch(function (){
                    if(connected.$value === true){
                        online.$add(true).then(function(connectedRef){
                            connectedRef.onDisconnect().remove();
                        });
                    }
                });
            },
            all: users
        };

        return Users;
    }
})();
