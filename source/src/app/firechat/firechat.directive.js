/**
 * Created by joeny on 3/7/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .directive('fireChatBox', fireChatBox);

    function fireChatBox(auth) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/firechat/firechat.tmpl.html',
            transclude: true,
            replace: true,
            scope: {
                title: '@',
                subtitle: '@',
                avatar: '@'
            },
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link
        };
        return directive;

        function link($scope, $element, attrs) {


            function initChat(user) {
                // Get a Firebase Database ref
                var chatRef = firebase.database().ref("chat");

                // Create a Firechat instance
                var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

                Users.getCurrentProfile().then(function(user) {
                    user.$loaded()
                        .then(function (data) {
                            // Set the Firechat user
                            chat.setUser(user.$id, user.displayName);
                            console.log('Data', data);
                        }).catch(function (error) {
                        console.error("Error, ", error);
                    });
                })
            }

            initChat(auth);
        }
    }

})();
