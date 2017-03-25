/**
 * Created by joeny on 2/21/17.
 */
(function () {
    'use strict';

    angular
        .module('home')
        .controller('ChatPageController', ChatPageController);

    function ChatPageController($scope, auth, Users) {
        var vm = this;
        //
        // function initChat(user) {
        //     // Get a Firebase Database ref
        //     var chatRef = firebase.database().ref("chat");
        //
        //     // Create a Firechat instance
        //     var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
        //
        //     Users.getCurrentProfile().then(function(user) {
        //         user.$loaded()
        //             .then(function (data) {
        //                 // Set the Firechat user
        //                 chat.setUser(user.$id, user.displayName);
        //                 console.log('Data', data);
        //             }).catch(function (error) {
        //             console.error("Error, ", error);
        //         });
        //     })
        // }
        //
        // initChat(auth);
    }
})();
