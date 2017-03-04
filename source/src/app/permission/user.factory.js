(function() {
    'use strict';

    angular
        .module('app.permission')
        .factory('ProfileFactory', ProfileFactory)
        .factory('UserService', UserService);

    function ProfileFactory($firebaseArray, $firebaseObject, $firebaseUtils, Auth) {
        var profilesRef = firebase.database().ref('profiles');
        var profiles = $firebaseArray(profilesRef);

        var User = User || {};

        User.Current = function () {
            this.name = '';
            this.location = 'Houston, TX';
            this.website = '';
            this.twitter = '';
            this.bio = '';
            this.displayName = '';
            this.avatar = 'assets/images/avatars/avatar-5.png';
            this.showLocation = false;
            this.showAvatar = true;
            this.showUsername = true;
            this.sendNotification = false;
            this.makeMyProfilePublic = false;

            this.roles = ['SUPERADMIN'];
        };

        User.Current.prototype = {
            load: function (profile) {
                this.$profile = profile;

                this.name = profile.name;
                this.location = profile.location;
                this.website = profile.website;
                this.bio = profile.bio;
                this.displayName = profile.displayName;
                this.avatar = profile.avatar;
                this.showLocation = profile.showLocation;
                this.showAvatar = profile.showAvatar;
                this.showUsername = profile.showUsername;
                this.sendNotification = profile.sendNotification;
                this.makeMyProfilePublic = profile.makeMyProfilePublic;

                this.roles = profile.roles;
            },

            saveProfile: function () {
                this.$profile.name = this.name;
                this.$profile.location = this.location;
                this.$profile.website = this.website;
                this.$profile.bio = this.bio;
                this.$profile.displayName = this.displayName;
                this.$profile.avatar = this.avatar;
                this.$profile.showLocation = this.showLocation;
                this.$profile.showAvatar = this.showAvatar;
                this.$profile.showUsername = this.showUsername;
                this.$profile.sendNotification = this.sendNotification;
                this.$profile.makeMyProfilePublic = this.makeMyProfilePublic;

                this.$profile.$save();
            }
        };

        return User;
    }

    /* @ngInject */
    /**
     *
     *
     * @param $firebaseArray:
     * @param $firebaseObject:
     * @param $q:
     * @param $http:
     * @param RoleStore:
     * */
    function UserService($firebaseArray, $firebaseObject, $q, $http, RoleStore, ProfileFactory, Auth) {

        var usersRef = firebase.database().ref('user');
        var users = $firebaseArray(usersRef);

        var currentUser = {
            name: 'Christos',
            email: 'info@oxygenna.com',
            location: 'Sitia, Crete, Greece',
            website: 'http://www.oxygenna.com',
            twitter: 'oxygenna',
            bio: 'We are a small creative web design agency \n who are passionate with our pixels.',
            current: '',
            password: '',
            confirm: '',
            displayName: 'Christos',
            username: 'christos',
            avatar: 'assets/images/avatars/avatar-5.png',
            roles: ['SUPERADMIN']
        };
        
        var service = {
            // getProfileAuth: function () {
            //     return Auth.$requireSignIn().then(function(auth){
            //         return Users.getProfile(auth.uid).$loaded();
            //     });
            // },
            saveEmailKey: function (uid, email) {
                var emailKey = encodeURIComponent(email).replace(/\./g, '%2E');

                var ref = firebase.database().ref().child('emailMap');
                var item = ref.child(emailKey);

                var obj = $firebaseObject(item);

                obj.$loaded().then(function () {
                    obj.uid = uid;
                    obj.$save();
                });
            },
            decodeEmail: function (email) {
                return decodeURIComponent(email);
            },
            createUser: function (uid) {
                var ref = firebase.database().ref().child('user');
                var item = ref.child(uid);

                item.set({
                    sharedEssays: [null]
                })
            },
            createProfile: function (uid, name) {
                var obj = new ProfileFactory.Current();

                obj.name = name;
                obj.displayName = name;

                var ref = firebase.database().ref().child('profile');
                var item = ref.child(uid);

                item.set(obj);
            },
            saveProfile: function (uid) {
                var user = this.getProfile(uid);

                user.$save();
            },
            getProfile: function(uid){
                // create a reference to the database node where we will store our data
                var ref = firebase.database().ref('profile');
                var profileRef = ref.child(uid);

                // return it as a synchronized object.
                return $firebaseObject(profileRef);
            },
            getProfileObject: function () {
                var vm = this;

                return Auth.$requireSignIn().then(function(auth){
                    return vm.getProfile(auth.uid).$loaded().then(
                        function (userProfile) {
                            var user = new ProfileFactory.Current();

                            // Finish the loaded profile.
                            user.load(userProfile);

                            return user;
                        }
                    );
                });
            },
            getDisplayName: function(uid){
                return users.$getRecord(uid).displayName;
            },
            getGravatar: function(uid){
                return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
            },
            getCurrentUser: function getCurrentUser() {
                var vm = this;

                return Auth.$requireSignIn().then(function(Auth){
                    return vm.getProfile(Auth.uid).$loaded();
                });
                // return currentUser;
            },
            getUsers: function getUsers() {
                return $http.get('app/permission/data/users.json');
            },
            hasPermission: function hasPermission(permission) {
                var deferred = $q.defer();
                var hasPermission = false;

                // check if user has permission via its roles
                angular.forEach(currentUser.roles, function(role) {
                    // check role exists
                    if(RoleStore.hasRoleDefinition(role)) {
                        // get the role
                        var roleDef = RoleStore.getRoleDefinition(role);
                        // check if the permission we are validating is in this role's permissions
                        if(-1 !== roleDef.permissionNames.indexOf(permission)) {
                            hasPermission = true;
                        }
                    }
                });

                // if we have permission resolve otherwise reject the promise
                if(hasPermission) {
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                }

                // return promise
                return deferred.promise;
            },
            login: function login(username) {
                // you would replace the code below with a call you your API
                // request all users
                return getUsers()
                    .then(function successCallback(response) {
                        var returnUser = getCurrentUser();
                        angular.forEach(response.data, function(user) {
                            if(user.username === username) {
                                returnUser = user;
                                currentUser = user;
                            }
                        });
                        return returnUser;
                    });
            },
            all: users
        };

        return service;
    }
})();
