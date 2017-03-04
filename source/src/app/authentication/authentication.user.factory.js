(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('Users', UsersFactory);

    function UsersFactory($q, $firebaseArray, $firebaseObject, Auth) {
        var usersRef = firebase.database().ref('user');
        var profileRef = firebase.database().ref('profile');
        var emailMapRef = firebase.database().ref('emailMap');

        var users = $firebaseArray(usersRef);

        var Users = {
            usersRef: usersRef,
            profileRef: profileRef,
            emailMapRef: emailMapRef,
            shareEssayToUser: function () {

            },
            getProfile: function(uid){
                return $firebaseObject(profileRef.child(uid));
            },
            getCurrentProfile: function() {
                var vm = this;
                return Auth.$requireSignIn().then(function (auth) {
                    return vm.getProfile(auth.uid);
                });
            },
            getDisplayName: function(uid){
                return users.$getRecord(uid).displayName;
            },
            getGravatar: function(uid){
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
            all: users
        };

        return Users;
    }
})();
