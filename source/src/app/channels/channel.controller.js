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
        vm.users = Users.all;

        vm.getDisplayName = Users.getDisplayName;
        vm.getGravatar = Users.getGravatar;

        Users.setOnline(profile.$id);

        vm.logout = function(){
            vm.profile.online = null;
            vm.profile.$save().then(function(){
                Auth.$signOut().then(function(){
                    $state.go('home');
                });
            });
        };

        vm.newChannel = {
            name: ''
        };

        vm.createChannel = function(){
            vm.channels.$add(vm.newChannel).then(function(ref){
                $state.go('triangular.channels.messages', {channelId: ref.key});
                
            });
        };
    }
})();
