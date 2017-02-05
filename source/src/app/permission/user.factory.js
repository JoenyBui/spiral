(function() {
    'use strict';

    angular
        .module('app.permission')
        .factory('CurrentUser', CurrentUserFactory)
        .factory('UserService', UserService);

    function CurrentUserFactory() {
        var User = UserFactory || {};

        User.Current = function () {
            this.name = null;
            this.email = null;
            this.location = null;
            this.website = null;
            this.twitter = null;
            this.bio = null;
            this.current = null;
            this.password = null;
            this.confirm = null;
        };

        User.Current.prototype = {
            load: function (uid) {

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
    function UserService($firebaseArray, $firebaseObject, $q, $http, RoleStore, Auth) {

        var usersRef = firebase.database().ref('users');
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
            saveProfile: function (uid) {
                var user = this.getProfile(uid);


                user.$save();
            },
            getProfile: function(uid){
                return $firebaseObject(usersRef.child(uid));
            },
            getDisplayName: function(uid){
                return users.$getRecord(uid).displayName;
            },
            getGravatar: function(uid){
                return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
            },
            getCurrentUser: function getCurrentUser() {
                return Auth.$requireSignIn().then(function(){
                    return Users.getProfile(Auth.uid).$loaded();
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
