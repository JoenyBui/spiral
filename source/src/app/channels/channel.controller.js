/**
 * Created by joeny on 4/10/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChannelsController', ChannelsController);

    function ChannelsController($state, Auth, Users, profile, channels){
        var vm = this;

        vm.profile = profile;
        vm.channels = channels;

        vm.getDisplayName = Users.getDisplayName;
        vm.getGravatar = Users.getGravatar;

        vm.logout = function(){
            Auth.$signOut().then(function(){
                $state.go('home');
            });
        };

        vm.newChannel = {
            name: ''
        };

        vm.createChannel = function(){
            vm.channels.$add(vm.newChannel).then(function(){
                vm.newChannel = {
                    name: ''
                };
            });
        };
    }
})();
