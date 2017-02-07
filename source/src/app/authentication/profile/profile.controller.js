(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($scope, $firebaseObject, md5, auth, profile, ProfileFactory) {
        var vm = this;

        vm.user = profile;
        
//         vm.user = new ProfileFactory.Current();

        // Finish the loaded profile.
//         profile.then(function (userProfile) {
//             vm.user.load(userProfile);
//         });

        // vm.user = profile;
        // vm.user.$bindTo($scope, 'profile').then(function () {
        //     vm.user.$watch(function () {
        //         // Update the changes.
        //         console.log('Profile');
        //     })
        // });

        vm.settingsGroups = [{
            name: 'Account Settings',
            settings: [{
                title: 'Show my location',
                icon: 'zmdi zmdi-pin',
                enabled: true
            },{
                title: 'Show my avatar',
                icon: 'zmdi zmdi-face',
                enabled: false
            },{
                title: 'Send me notifications',
                icon: 'zmdi zmdi-notifications-active',
                enabled: true
            }]
        },{
            name: 'Chat Settings',
            settings: [{
                title: 'Show my username',
                icon: 'zmdi zmdi-account',
                enabled: true
            },{
                title: 'Make my profile public',
                icon: 'zmdi zmdi-account-box',
                enabled: false
            },{
                title: 'Allow cloud backups',
                icon: 'zmdi zmdi-cloud-upload',
                enabled: true
            }]
        }];

        vm.updateProfile = function(){
            vm.user.saveProfile();
        };
    }
})();
