/**
 * Created by joeny on 4/19/17.
 */
(function () {
    'use strict';

    angular
        .module('home')
        .controller('DirectMessageController', DirectMessageController);

    function DirectMessageController($scope, $mdDialog, Users, id, profile, channelName, messages) {
        var vm = this;

        $scope.messageList = [];

        vm.userClass = function(id) {
            return Users.isCurrentUser(id) ? 'user-left' : 'user-right';
        };

        vm.userColor = function (id) {
            return Users.isCurrentUser(id) ? 'cyan' : 'light-green';
        };

        // Reference to the /messages/ database path.
        vm.messagesRef = messages.$ref();

        // Make sure we remove all previous listeners.
        vm.messagesRef.off();

        vm.messagesRef.limitToLast(12).on('child_added', function (data) {
            $scope.messageList.push(data.val());
            $scope.$apply();
            
        }).bind(this);

        vm.users = Users;
        vm.messages = messages;
        vm.channelName = channelName;

        vm.message = '';

        vm.sendMessage = function (){
            if(vm.message.length > 0){
                vm.messages.$add({
                    uid: profile.$id,
                    body: vm.message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(function (ref){
                    vm.message = '';
                });
            }
        };

        vm.closeDialog = function() {
            $mdDialog.hide();
        }
    }
})();
