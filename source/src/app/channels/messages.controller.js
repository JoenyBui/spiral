/**
 * Created by joeny on 4/15/17.
 */
(function () {
    angular
        .module('app')
        .controller('MessagesController', MessagesController);

        function MessagesController(profile, channelName, messages){
            var vm = this;

            vm.messages = messages;
            vm.channelName = channelName;

            vm.message = '';

            vm.sendMessage = function (){
                if(vm.message.length > 0){
                    vm.messages.$add({
                        uid: profile.$id,
                        body: vm.message,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    }).then(function (){
                        vm.message = '';
                    });
                }
            };
        }
})();
