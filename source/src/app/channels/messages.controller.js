/**
 * Created by joeny on 4/15/17.
 */
(function () {
    angular
        .module('app')
        .controller('MessagesController', MessagesController);

        function MessagesController($scope, Users, profile, channelName, messages){
            var vm = this;

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

            // Loads the last 12 messages and listen for new ones.
            var setMessage = function(data) {
                var val = data.val();
                vm.messageList.push(val);
                // this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
            }.bind(this);

            vm.messagesRef.limitToLast(12).on('child_added', setMessage);
            // vm.messagesRef.limitToLast(12).on('child_changed', setMessage);

            // messages.$bindTo($scope, "data").then(function() {
            //     console.log($scope.data); // { foo: "bar" }
            //     $scope.data.foo = "baz";  // will be saved to the database
            //     ref.set({ foo: "baz" });  // this would update the database and $scope.data
            // });

            vm.users = Users;
            vm.messages = messages;
            vm.messageList = [];
            vm.channelName = channelName;

            vm.message = '';

            // vm.messages.$watch(function(event, key, prevChild) {
            //     console.log(event);
            //     // var val = data.val();
            //     this.displayMessage(data.key, val.name, val.b, val.photoUrl, val.imageUrl);
            //
            // });

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
        }
})();
